import { combineReducers } from 'redux';
import session, * as fromSession from './session';
import message from './message';
import expenses, * as fromExpenses from './expenses';
// import friends, * as fromFriends from './friends';
// import debts, * as fromDebts from './debts';

const rootReducer = combineReducers({
  session,
  message,
  expenses,
});

export default rootReducer;

export const getCurrentUser = state =>
  fromSession.getCurrentUser(state.session);

export const getAuthenticated = state =>
  fromSession.getAuthenticated(state.session);

export const getAllExpenses = state =>
  fromExpenses.getAllExpenses(state.expenses);
