class CreateDirectors < ActiveRecord::Migration[7.0]
  def change
    create_table :directors do |t|
      t.string :name, null: false
      t.string :slug, null: false
      t.integer :tmdb_person_id
      t.text :bio
      t.string :portrait_url
      t.string :country
      t.integer :birth_year
      t.integer :death_year
      t.timestamps
    end

    add_index :directors, :slug, unique: true
    add_index :directors, :name, unique: true
    add_index :directors, :tmdb_person_id, unique: true
  end
end
