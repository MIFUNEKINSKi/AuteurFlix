require 'net/http'
require 'json'

class TmdbService
  BASE_URL = "https://api.themoviedb.org/3"
  IMAGE_BASE_URL = "https://image.tmdb.org/t/p"

  def initialize
    @api_key = ENV['TMDB_API_KEY']
    raise "TMDB_API_KEY environment variable is not set" unless @api_key
  end

  # Search TMDB for a movie by title and year, return the best match
  def search_movie(title, year = nil)
    params = { api_key: @api_key, query: title }
    params[:year] = year if year

    response = get("/search/movie", params)
    results = response["results"]
    return nil if results.blank?

    # Prefer exact year match, fall back to closest
    if year
      exact = results.find { |r| r["release_date"]&.start_with?(year.to_s) }
      return exact if exact
    end

    results.first
  end

  # Get full movie details by TMDB ID
  def movie_details(tmdb_id)
    get("/movie/#{tmdb_id}", { api_key: @api_key })
  end

  # Sync a single Movie record with TMDB data
  def sync_movie(movie)
    result = search_movie(movie.title, movie.year)
    return { movie: movie, status: :not_found } unless result

    details = movie_details(result["id"])
    video = best_trailer(result["id"])

    movie.update!(
      tmdb_id: details["id"],
      tmdb_rating: details["vote_average"],
      tmdb_vote_count: details["vote_count"],
      tmdb_poster_path: details["poster_path"],
      tmdb_backdrop_path: details["backdrop_path"],
      tmdb_overview: details["overview"],
      tmdb_video_key: video&.dig("key"),
      tmdb_video_site: video&.dig("site"),
      tmdb_last_synced_at: Time.current
    )

    { movie: movie, status: :synced, tmdb_id: details["id"] }
  rescue => e
    { movie: movie, status: :error, error: e.message }
  end

  # Fetch the best trailer for a movie from TMDB's videos endpoint.
  # Prefers official trailers on YouTube, then any YouTube trailer, then any video.
  def best_trailer(tmdb_id)
    response = get("/movie/#{tmdb_id}/videos", { api_key: @api_key })
    results = response["results"] || []
    return nil if results.empty?

    youtube = results.select { |v| v["site"] == "YouTube" }
    return nil if youtube.empty?

    official_trailer = youtube.find { |v| v["type"] == "Trailer" && v["official"] }
    return official_trailer if official_trailer

    any_trailer = youtube.find { |v| v["type"] == "Trailer" }
    return any_trailer if any_trailer

    teaser = youtube.find { |v| v["type"] == "Teaser" }
    return teaser if teaser

    youtube.first
  end

  # Fetch a person's profile + filmography from TMDB.
  def person_details(tmdb_person_id)
    get("/person/#{tmdb_person_id}", { api_key: @api_key, append_to_response: "movie_credits" })
  end

  # Sync a Director's bio + portrait from TMDB.
  def sync_director(director)
    return { director: director, status: :no_tmdb_id } if director.tmdb_person_id.blank?

    person = person_details(director.tmdb_person_id)
    director.update!(
      bio: person["biography"].presence || director.bio,
      birth_year: person["birthday"]&.slice(0, 4)&.to_i || director.birth_year,
      death_year: person["deathday"]&.slice(0, 4)&.to_i,
      country: person["place_of_birth"].to_s.split(",").last&.strip || director.country,
      portrait_url: person["profile_path"] ? "#{IMAGE_BASE_URL}/w500#{person['profile_path']}" : director.portrait_url
    )
    { director: director, status: :synced }
  rescue => e
    { director: director, status: :error, error: e.message }
  end

  # Ingest a director's filmography from TMDB. For each directing credit not
  # already in the local catalog, create a Movie row + tag it with the
  # director's matching genre (if one exists) so it appears in browse rows.
  # Existing movies are upserted with TMDB metadata.
  def ingest_director_filmography(director, limit: 30, min_year: nil)
    return { status: :no_tmdb_id, director: director } if director.tmdb_person_id.blank?

    person = person_details(director.tmdb_person_id)
    credits = (person.dig("movie_credits", "crew") || [])
                .select { |c| c["job"] == "Director" }
                .reject { |c| min_year && c["release_date"].to_s[0, 4].to_i < min_year }
                .sort_by { |c| -(c["vote_count"] || 0) }
                .first(limit)

    director_genre = Genre.find_by(genre: director.name)
    created = 0
    updated = 0
    skipped = 0

    credits.each do |c|
      year = c["release_date"].to_s[0, 4].to_i
      next if year.zero?

      details = movie_details(c["id"])
      runtime = details["runtime"] || 0
      next if runtime.zero?

      video = best_trailer(c["id"])

      movie = Movie.find_or_initialize_by(tmdb_id: details["id"])
      is_new = movie.new_record?

      movie.assign_attributes(
        title: details["title"],
        year: year,
        summary: details["overview"].presence || "(No summary available.)",
        length: runtime,
        director: director.name,
        tmdb_id: details["id"],
        tmdb_rating: details["vote_average"],
        tmdb_vote_count: details["vote_count"],
        tmdb_poster_path: details["poster_path"],
        tmdb_backdrop_path: details["backdrop_path"],
        tmdb_overview: details["overview"],
        tmdb_video_key: video&.dig("key"),
        tmdb_video_site: video&.dig("site"),
        tmdb_last_synced_at: Time.current
      )

      begin
        movie.save!
        if director_genre && Tag.where(movie_id: movie.id, genre_id: director_genre.id).none?
          Tag.create!(movie_id: movie.id, genre_id: director_genre.id)
        end
        is_new ? created += 1 : updated += 1
      rescue ActiveRecord::RecordInvalid
        skipped += 1
      end

      sleep(0.3) # respect rate limits
    end

    { status: :ok, director: director, created: created, updated: updated, skipped: skipped }
  end

  # Sync all movies in the database
  def sync_all
    results = []
    Movie.find_each do |movie|
      result = sync_movie(movie)
      results << result
      # Rate limit: TMDB allows ~40 requests per 10 seconds
      sleep(0.3)
    end
    results
  end

  # Build full poster URL from path
  def self.poster_url(poster_path, size: "w500")
    return nil unless poster_path
    "#{IMAGE_BASE_URL}/#{size}#{poster_path}"
  end

  # Build full backdrop URL from path
  def self.backdrop_url(backdrop_path, size: "w1280")
    return nil unless backdrop_path
    "#{IMAGE_BASE_URL}/#{size}#{backdrop_path}"
  end

  private

  def get(path, params = {})
    uri = URI("#{BASE_URL}#{path}")
    uri.query = URI.encode_www_form(params)

    http = Net::HTTP.new(uri.host, uri.port)
    http.use_ssl = true
    http.open_timeout = 10
    http.read_timeout = 10

    request = Net::HTTP::Get.new(uri)
    response = http.request(request)

    unless response.is_a?(Net::HTTPSuccess)
      raise "TMDB API error: #{response.code} #{response.body}"
    end

    JSON.parse(response.body)
  end
end
