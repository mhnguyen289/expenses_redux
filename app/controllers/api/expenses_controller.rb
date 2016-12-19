class Api::ExpensesController < ApplicationController

  skip_before_action :authenticate_token

  def expenses_and_borrowed
    @expenses_and_borrowed = Expense.expenses_and_borrowed(params[:user_id])
    render json: @expenses_and_borrowed
  end

  def expenses_and_lent
    @expenses_and_lent = Expense.expenses_and_lent(params[:user_id])
    render json: @expenses_and_lent
  end

  def expenses_and_debts_between
    @between = Expense.expenses_and_debts_between(params[:user_id], params[:friend_id])
    render json: @between
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
