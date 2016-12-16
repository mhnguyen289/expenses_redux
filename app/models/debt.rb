class Debt < ApplicationRecord
  belongs_to :expense, foreign_key: :expense_id
  belongs_to :user,    foreign_key: :borrower_id
end
