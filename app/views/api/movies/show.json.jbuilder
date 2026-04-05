json.movie do
    json.extract! @movie, :id, :title, :year, :director, :summary, :length
    json.photoUrl rails_storage_proxy_url(@movie.photo) if @movie.photo.attached?
    json.videoUrl rails_storage_proxy_url(@movie.video) if @movie.video.attached?
    json.thumbnailUrl rails_storage_proxy_url(@movie.thumbnail) if @movie.thumbnail.attached?
    json.tmdbRating @movie.tmdb_rating
    json.tmdbVoteCount @movie.tmdb_vote_count
    json.tmdbPosterUrl "https://image.tmdb.org/t/p/w500#{@movie.tmdb_poster_path}" if @movie.tmdb_poster_path
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
