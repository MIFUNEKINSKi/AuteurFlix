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

    movie.update!(
      tmdb_id: details["id"],
      tmdb_rating: details["vote_average"],
      tmdb_vote_count: details["vote_count"],
      tmdb_poster_path: details["poster_path"],
      tmdb_backdrop_path: details["backdrop_path"],
      tmdb_overview: details["overview"],
      tmdb_last_synced_at: Time.current
    )

    { movie: movie, status: :synced, tmdb_id: details["id"] }
  rescue => e
    { movie: movie, status: :error, error: e.message }
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
