import { combineReducers } from 'redux';
import authenticated from './authenticated';
import message from './message';
import expenses, * as fromExpenses from './expenses';
import friends, * as fromFriends from './friends';
import debts, * as fromDebts from './debts';
import savedExpense from './savedExpense';

const rootReducer = combineReducers({
  authenticated,
  message,
  friends,
  expenses,
  debts,
  savedExpense,
});

export default rootReducer;

export const getAllExpenses = state =>
  fromExpenses.getAllExpenses(state.expenses);

export const getAllFriends = state =>
  fromFriends.getAllFriends(state.friends);

export const getFriend = (state, friendId) =>
  fromFriends.getFriend(state.friends, friendId);

export const getAllDebts = (state) =>
  fromDebts.getAllDebts(state.debts);
