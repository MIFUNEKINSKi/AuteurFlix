class AddTmdbVideoKeyToMovies < ActiveRecord::Migration[7.0]
  def change
    add_column :movies, :tmdb_video_key, :string
    add_column :movies, :tmdb_video_site, :string
  end
end
