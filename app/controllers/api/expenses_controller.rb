class Api::ExpensesController < ApplicationController

  def expenses_with
    expenses = Expense.expenses_and_debts_between(current_user.id, params[:friend_id])
    render json: expenses
  end

  def all_expenses
    expenses = Expense.expenses_and_lent(current_user.id)
    render json: expenses
  end

  def create
    ids = expense_params[:ids]
    debts = expense_params[:debts]
    title = expense_params[:title]
    expense_amount = expense_params[:amount]
    expense = Expense.new(paid_by_id: current_user.id, title: title, expense_amount: expense_amount)
    if expense.valid?
      if expense.save
        debts.each_with_index do |debt, index|
          borrower = User.find_by_id(ids[index])
          debt = Debt.create!(expense_id: expense.id, debt_amount: debt, borrower_id: borrower.id)
        end
        render json: expense
      else
        render json: expense.errors
      end
    else
      render json: {invalid: "invalid expense data"}
    end
  end

  private

  def expense_params
    params.require(:expense).permit(:title, :amount, ids: [], debts: [])
  end
end
