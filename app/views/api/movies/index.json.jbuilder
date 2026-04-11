
json.movies do
    @movies.each do |movie|
        json.set! movie.id do
            json.extract! movie, :id, :title, :year, :director, :summary, :length
            json.photoUrl movie.photo_url if movie.photo_url.present?
            json.videoUrl movie.video_url if movie.video_url.present?
            json.thumbnailUrl movie.thumbnail_url if movie.thumbnail_url.present?
            json.tmdbRating movie.tmdb_rating
            json.tmdbVoteCount movie.tmdb_vote_count
            json.tmdbPosterUrl "https://image.tmdb.org/t/p/w500#{movie.tmdb_poster_path}" if movie.tmdb_poster_path
        end
    end
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
