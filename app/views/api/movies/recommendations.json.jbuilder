json.array! @movies do |movie|
  json.extract! movie, :id, :title, :year, :director
  json.thumbnailUrl movie.thumbnail_url if movie.thumbnail_url.present?
  json.tmdbRating movie.tmdb_rating
  json.tmdbId movie.tmdb_id
end
