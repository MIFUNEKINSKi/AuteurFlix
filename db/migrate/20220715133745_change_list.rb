class ChangeList < ActiveRecord::Migration[5.2]
  def change
    add_index :lists, [:profile_id, :movie_id]
  end
end
