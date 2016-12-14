import * as types from '../constants/action_types';

export const addExpense = (response) => ({
  type: types.ADD_EXPENSE,
  id: response.id,
  response,
});

export const recieveExpenses = (response) => ({
  type: types.RECEIVE_EXPENSES,
  response,
});
