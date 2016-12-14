import * as types from '../constants/action_types';

export const recieveDebts = (response) => ({
  type: types.RECEIVE_DEBTS,
  response,
});
