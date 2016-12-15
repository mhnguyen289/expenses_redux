class Expense < ApplicationRecord
  belongs_to :user, foreign_key: :paid_by_id
  has_many :debts

  def self.my_expenses(user_id)
    where(paid_by_id: user_id)
  end

  def self.my_debts(user_id)
    Expense.includes(:debts).where({debts: {borrower_id: user_id}})
  end
end
