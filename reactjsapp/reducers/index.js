import { combineReducers } from 'redux';
import session, * as fromSession from './session';
import message from './message';
import expenses, * as fromExpenses from './expenses';
import friends, * as fromFriends from './friends';

const rootReducer = combineReducers({
  session,
  message,
  friends,
  expenses,
});

export default rootReducer;

export const getCurrentUser = state =>
  fromSession.getCurrentUser(state.session);

export const getAuthenticated = state =>
  fromSession.getAuthenticated(state.session);

export const getAllExpenses = state =>
  fromExpenses.getAllExpenses(state.expenses);

export const getAllFriends = state =>
  fromFriends.getAllFriends(state.friends);
