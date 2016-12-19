import * as types from '../constants/action_types';

const addExpenseSuccess = (response) => ({
  type: types.ADD_EXPENSE,
  id: response.id,
  response,
});

const receiveExpenses = (response) => ({
  type: types.RECEIVE_EXPENSES,
  response,
});

const receiveExpensesError = (error) => ({
  type: 'RECEIVE_EXPENSES_ERROR',
  error,
});

const addExpenseError = (error) => ({
  type: 'ADD_EXPENSE_ERROR',
  error,
});

export const fetchExpensesBetween = (userId, friendId) => (dispatch) => {
  const url = `api/expenses_between/${userId}/${friendId}`;
  fetch(url)
      .then(response => response.json())
      .then(json => dispatch(receiveExpenses(json)))
      .catch(error => dispatch(receiveExpensesError(error)));
};

export const addExpense = ({ title, amount, ids, debts }) => (dispatch) => {
  const url = 'api/expenses';
  const headers = {
    'AUTHORIZATION': `Bearer ${localStorage.getItem('jwt')}`,
  };
  $.ajax({
    url,
    method: 'POST',
    dataType: 'json',
    data: { expense: { title, amount, ids, debts } },
    headers,
  })
  .done(response => {
    dispatch(addExpenseSuccess(response));
  })
  .fail(error => {
    dispatch(addExpenseError(error));
  });
};
