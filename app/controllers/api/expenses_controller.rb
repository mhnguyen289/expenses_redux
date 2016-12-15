class Api::ExpensesController < ApplicationController

  skip_before_action :authenticate_token #, only: [:create]

  def create
  end

  def my_expenses
    expenses = Expense.my_expenses(params[:user_id])
    render json: expenses
  end

  def my_debts
    render json: Expense.my_debts(params[:user_id])
  end

  def expense_params
    # params.require(:expense).permit()
  end
end
