class CreateExpenses < ActiveRecord::Migration[5.0]
  def change
    create_table :expenses do |t|
      t.decimal  :amount,        precision: 8, scale: 2, null: false
      t.string   :title,         null: false
      t.integer  :paid_by_id,    null: false
      t.datetime :expense_date
    end

    add_foreign_key :expenses, :users, column: :paid_by_id
  end
end
