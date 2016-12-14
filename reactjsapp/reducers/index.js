import { combineReducers } from 'redux';
import session, * as fromSession from './session';
import message from './message';
import friends, * as fromFriends from './friends';
import expenses, * as fromExpenses from './expenses';
import debts, * as fromDebts from './debts';

const rootReducer = combineReducers({
  session,
  message,
  friends,
  expenses,
  debts,
});

export default rootReducer;

export const getCurrentUser = state =>
  fromSession.getCurrentUser(state.session);

export const getAuthenticated = state =>
  fromSession.getAuthenticated(state.session);

export const getAllFriends = state =>
  fromFriends.getAllFriends(state.friends);

export const getAllExpenses = state =>
  fromExpenses.getAllExpenses(state.expenses);

export const getAllDebts = state =>
  fromDebts.getAllDebts(state.debts);
