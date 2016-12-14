class Expense < ApplicationRecord
  belongs_to :user, foreign_key: :paid_by_id
  has_many :debts
end
