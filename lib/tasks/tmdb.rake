namespace :tmdb do
  desc "Sync all movies with TMDB metadata only when TMDB_API_KEY is set (safe for deploy hooks)"
  task sync_if_configured: :environment do
    key = ENV['TMDB_API_KEY'].to_s.strip
    if key.empty?
      puts "TMDB_API_KEY not set — skipping tmdb:sync."
    else
      puts "TMDB_API_KEY found (#{key[0..3]}…), running sync…"
      begin
        Rake::Task['tmdb:sync'].invoke
      rescue => e
        # Don't let TMDB errors kill the deploy
        puts "⚠ TMDB sync failed (non-fatal): #{e.message}"
      end
    end
  end

  desc "Sync all movies with TMDB metadata (ratings, posters, overviews)"
  task sync: :environment do
    puts "Starting TMDB sync..."
    puts "=" * 60

    service = TmdbService.new
    results = service.sync_all

    synced = results.select { |r| r[:status] == :synced }
    not_found = results.select { |r| r[:status] == :not_found }
    errors = results.select { |r| r[:status] == :error }

    puts "\n#{"=" * 60}"
    puts "TMDB Sync Complete"
    puts "=" * 60
    puts "  Synced:    #{synced.count}"
    puts "  Not found: #{not_found.count}"
    puts "  Errors:    #{errors.count}"
    puts "  Total:     #{results.count}"

    if synced.any?
      puts "\nSynced movies:"
      synced.each { |r| puts "  ✓ #{r[:movie].title} (TMDB ID: #{r[:tmdb_id]})" }
    end

    if not_found.any?
      puts "\nNot found on TMDB:"
      not_found.each { |r| puts "  ? #{r[:movie].title} (#{r[:movie].year})" }
    end

    if errors.any?
      puts "\nErrors:"
      errors.each { |r| puts "  ✗ #{r[:movie].title}: #{r[:error]}" }
    end
  end

  desc "Sync a single movie by ID"
  task :sync_one, [:movie_id] => :environment do |_t, args|
    movie = Movie.find(args[:movie_id])
    service = TmdbService.new
    result = service.sync_movie(movie)

    case result[:status]
    when :synced
      puts "✓ Synced '#{movie.title}' (TMDB ID: #{result[:tmdb_id]})"
      puts "  Rating: #{movie.tmdb_rating}/10 (#{movie.tmdb_vote_count} votes)"
      puts "  Poster: #{TmdbService.poster_url(movie.tmdb_poster_path)}"
    when :not_found
      puts "? '#{movie.title}' (#{movie.year}) not found on TMDB"
    when :error
      puts "✗ Error syncing '#{movie.title}': #{result[:error]}"
    end
  end

  desc "Show TMDB sync status for all movies"
  task status: :environment do
    puts "TMDB Sync Status"
    puts "=" * 60

    Movie.order(:title).each do |movie|
      if movie.tmdb_id
        age = movie.tmdb_last_synced_at ? "synced #{time_ago_in_words(movie.tmdb_last_synced_at)} ago" : "no sync date"
        puts "  ✓ #{movie.title} — #{movie.tmdb_rating}/10 (#{movie.tmdb_vote_count} votes) [#{age}]"
      else
        puts "  ○ #{movie.title} — not synced"
      end
    end

    synced_count = Movie.where.not(tmdb_id: nil).count
    puts "\n#{synced_count}/#{Movie.count} movies synced with TMDB"
  end
end

def time_ago_in_words(time)
  seconds = (Time.current - time).to_i
  case seconds
  when 0..59 then "#{seconds}s"
  when 60..3599 then "#{seconds / 60}m"
  when 3600..86399 then "#{seconds / 3600}h"
  else "#{seconds / 86400}d"
  end
end
