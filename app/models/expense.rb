class Expense < ApplicationRecord
  belongs_to :user, foreign_key: :paid_by_id
  has_many :debts

  def self.lent_by(user_id)
    connection.select_all(self.sql_expenses_and_lent(user_id))
  end

  def self.owed_by(user_id)
    result = Expense.connection.select_all(self.sql_expenses_and_borrowed(user_id))
    with_username = result.map do |result|
      paid_by = User.find_by_id(result["paid_by_id"])
      expense = {
        id: result["id"],
        title: result["title"],
        expense_amount: result["expense_amount"],
        expense_date: result["expense_date"],
        paid_by_username: paid_by.username,
        debt_amount: result["debt_amount"],
        borrower_id: result["borrower_id"]
      }
    end
    with_username
  end

  def self.expenses_between(user_id, friend_id)
    connection.select_all(self.sql_expense_and_debts_between(user_id, friend_id))
  end

  private

  def self.sql_expenses_and_lent(user_id)
    "SELECT e.id, e.title, e.expense_date, e.expense_amount, SUM(debt_amount) AS lent
    FROM debts d
    INNER JOIN expenses e
    ON d.expense_id = e.id
    AND e.paid_by_id = '#{user_id}'
    GROUP BY e.id
    ORDER BY e.expense_date DESC;"
  end

  def self.sql_expenses_and_borrowed(user_id)
    "SELECT e.id, e.title, e.expense_date, e.expense_amount, e.paid_by_id, d.debt_amount, d.borrower_id
    FROM debts d
    INNER JOIN expenses e
    ON d.expense_id = e.id
    AND d.borrower_id = '#{user_id}'
    ORDER BY e.expense_date DESC;"
  end

  def self.sql_expense_and_debts_between(user_id, friend_id)
    "SELECT e.id, e.title, e.expense_date, e.expense_amount, e.paid_by_id, d.debt_amount, d.borrower_id
    FROM debts d
    INNER JOIN expenses e
    ON d.expense_id = e.id
    WHERE (e.paid_by_id = '#{user_id}' AND d.borrower_id = '#{friend_id}')
    OR (e.paid_by_id = '#{friend_id}' AND d.borrower_id = '#{user_id}')
    ORDER BY e.expense_date DESC;"
  end
end
