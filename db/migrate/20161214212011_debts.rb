class Debts < ActiveRecord::Migration[5.0]
  def change
    create_table :debts do |t|
      t.decimal :amount, precision: 8, scale: 2, null: false
      t.integer :borrower_id, null: false
      t.integer :expense_id, null: false
    end

    add_foreign_key :debts, :users,    column: :borrower_id
    add_foreign_key :debts, :expenses, column: :expense_id
  end
end
