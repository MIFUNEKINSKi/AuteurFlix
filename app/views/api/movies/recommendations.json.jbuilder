json.array! @movies do |movie|
  json.extract! movie, :id, :title, :year, :director
  json.thumbnailUrl movie.thumbnail_url if movie.thumbnail_url.present?
  json.tmdbCardUrl "https://image.tmdb.org/t/p/w780#{movie.tmdb_backdrop_path}" if movie.tmdb_backdrop_path
  json.tmdbRating movie.tmdb_rating
  json.tmdbId movie.tmdb_id
end
