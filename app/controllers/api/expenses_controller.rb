class Api::ExpensesController < ApplicationController

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

end
