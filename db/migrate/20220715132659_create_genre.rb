class CreateGenre < ActiveRecord::Migration[5.2]
  def change
    create_table :genres do |t|
      t.string :genre, null: false
      t.timestamps
    end
  end
end
