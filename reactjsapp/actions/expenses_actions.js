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

const receiveDebts = (response) => ({
  type: types.RECEIVE_DEBTS,
  response,
});

const addExpenseError = (error) => ({
  type: types.ERROR_ADD_EXPENSE,
  error,
});

const receiveExpensesError = (error) => ({
  type: 'RECEIVE_EXPENSES_ERROR',
  error,
});

const receiveDebtsError = (error) => ({
  type: 'RECEIVE_DEBTS_ERROR',
  error,
});

export const fetchDebts = () => (dispatch) => {
  const url = 'api/owed_by';
  const headers = { AUTHORIZATION: `Bearer ${localStorage.getItem('jwt')}` };
  $.ajax({
    url,
    method: 'GET',
    headers,
  })
  .done(response => {
    dispatch(receiveDebts(response));
  })
  .fail(error => {
    dispatch(receiveDebtsError(error));
  });
};

export const fetchAllExpenses = () => (dispatch) => {
  const url = 'api/lent_by';
  const headers = { AUTHORIZATION: `Bearer ${localStorage.getItem('jwt')}` };
  $.ajax({
    url,
    method: 'GET',
    headers,
  })
  .done(response => {
    dispatch(receiveExpenses(response));
  })
  .fail(error => {
    dispatch(receiveExpensesError(error));
  });
};

export const fetchExpensesWith = (friendId) => (dispatch) => {
  const url = `api/expenses_with/${friendId}`;
  const headers = { AUTHORIZATION: `Bearer ${localStorage.getItem('jwt')}` };
  $.ajax({
    url,
    method: 'GET',
    headers,
  })
  .done(response => {
    dispatch(receiveExpenses(response));
  })
  .fail(error => {
    dispatch(receiveExpensesError(error));
  });
};

export const addExpense = ({ title, amount, ids, debts }) => (dispatch) => {
  const url = 'api/expenses';
  const headers = {
    AUTHORIZATION: `Bearer ${localStorage.getItem('jwt')}`,
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
