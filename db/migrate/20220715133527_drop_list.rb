class DropList < ActiveRecord::Migration[5.2]
  def change
    drop_table :lists, if_exists: true
  end
end