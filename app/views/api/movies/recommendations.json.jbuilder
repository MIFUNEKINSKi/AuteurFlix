json.array! @movies do |movie|
  json.extract! movie, :id, :title, :year, :director
  json.thumbnailUrl rails_storage_proxy_url(movie.thumbnail) if movie.thumbnail.attached?
  json.tmdbRating movie.tmdb_rating
  json.tmdbId movie.tmdb_id
end
