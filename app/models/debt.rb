class Debt < ApplicationRecord
  belongs_to :expense, foreign_key: :expense_id
  belongs_to :user,    foreign_key: :borrower_id

  def self.my_debts(user_id)
    debts = Debt.joins(:expense).where({debts: {borrower_id: user_id}})
    debts.each do |d|
      puts "#{d.expense.amount}"
    end
    debts
  end

end
