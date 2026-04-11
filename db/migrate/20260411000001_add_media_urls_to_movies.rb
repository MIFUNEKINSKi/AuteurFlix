class AddMediaUrlsToMovies < ActiveRecord::Migration[7.0]
  def change
    add_column :movies, :thumbnail_url, :string
    add_column :movies, :video_url, :string
    add_column :movies, :photo_url, :string
  end
end
