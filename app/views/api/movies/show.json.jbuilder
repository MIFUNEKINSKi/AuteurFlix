json.movie do
    json.extract! @movie, :id, :title, :year, :director, :summary, :length
    json.photoUrl @movie.photo_url if @movie.photo_url.present?
    json.videoUrl @movie.video_url if @movie.video_url.present?
    json.thumbnailUrl @movie.thumbnail_url if @movie.thumbnail_url.present?
    json.tmdbRating @movie.tmdb_rating
    json.tmdbVoteCount @movie.tmdb_vote_count
    json.tmdbPosterUrl "https://image.tmdb.org/t/p/w500#{@movie.tmdb_poster_path}" if @movie.tmdb_poster_path
    json.tmdbBackdropUrl "https://image.tmdb.org/t/p/w1280#{@movie.tmdb_backdrop_path}" if @movie.tmdb_backdrop_path
    json.tmdbCardUrl "https://image.tmdb.org/t/p/w780#{@movie.tmdb_backdrop_path}" if @movie.tmdb_backdrop_path
    json.tmdbVideoKey @movie.tmdb_video_key if @movie.tmdb_video_key.present?
    json.tmdbVideoSite @movie.tmdb_video_site if @movie.tmdb_video_site.present?
end

json.tags do 
    @tags.each do |tag|
        json.set! tag.id do
            json.extract! tag, :movie_id, :genre_id
        end
    end
end

json.genres do 
    @genres.each do |genre|
        json.set! genre.id do
            json.extract! genre, :id, :genre
        end
    end
end
