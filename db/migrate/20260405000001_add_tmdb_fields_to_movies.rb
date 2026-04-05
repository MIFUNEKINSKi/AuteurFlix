class AddTmdbFieldsToMovies < ActiveRecord::Migration[7.0]
  def change
    add_column :movies, :tmdb_id, :integer
    add_column :movies, :tmdb_rating, :float
    add_column :movies, :tmdb_vote_count, :integer
    add_column :movies, :tmdb_poster_path, :string
    add_column :movies, :tmdb_backdrop_path, :string
    add_column :movies, :tmdb_overview, :text
    add_column :movies, :tmdb_last_synced_at, :datetime

    add_index :movies, :tmdb_id, unique: true
  end
end
