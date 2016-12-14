class Settlement < ActiveRecord::Migration[5.0]
  def change
    create_table :settlements do |t|
      t.decimal :amount,  precision: 8, scale: 2, null: false
      t.integer :from_id, null: false
      t.integer :to_id,   null: false
    end

    add_foreign_key :settlements, :users, column: :from_id
    add_foreign_key :settlements, :users, column: :to_id
  end
end
