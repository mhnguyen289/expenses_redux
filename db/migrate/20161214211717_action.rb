class Action < ActiveRecord::Migration[5.0]
  def change
    create_table :actions do |t|
      t.string :name, null:false
    end

    add_index :actions, :name, unique: true
  end
end
