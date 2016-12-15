import * as types from '../constants/action_types';

export const addExpense = (response) => ({
  type: types.ADD_EXPENSE,
  id: response.id,
  response,
});

export const receiveExpenses = (response) => ({
  type: types.RECEIVE_EXPENSES,
  response,
});

export const receiveExpensesError = (error) => ({
  type: 'RECEIVE_EXPENSES_ERROR',
  error,
});

export const fetchExpensesBetween = (userId, friendId) => (dispatch) => {
  const url = `api/expenses_between/${userId}/${friendId}`;
  fetch(url)
      .then(response => response.json())
      .then(json => dispatch(receiveExpenses(json)))
      .catch(error => dispatch(receiveExpensesError(error)));
};
