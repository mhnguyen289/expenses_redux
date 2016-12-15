class CreateRelationships < ActiveRecord::Migration[5.0]
  def change
    create_table :relationships do |t|
      t.integer :a_user_id, null: false
      t.integer :b_user_id, null: false
      t.integer :action_user_id, null: false
      t.integer :action_id, null: false
    end

    add_index       :relationships, [:a_user_id, :b_user_id], unique: true
    add_foreign_key :relationships, :users,   column: :a_user_id
    add_foreign_key :relationships, :users,   column: :b_user_id
    add_foreign_key :relationships, :users,   column: :action_user_id
    add_foreign_key :relationships, :actions, column: :action_id
  end
end
