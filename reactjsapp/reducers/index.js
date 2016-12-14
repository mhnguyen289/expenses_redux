import { combineReducers } from 'redux';
import session, * as fromSession from './session';
import message from './message';

const rootReducer = combineReducers({
  session,
  message,
});

export default rootReducer;

export const getCurrentUser = state =>
  fromSession.getCurrentUser(state.session);

export const getAuthenticated = state =>
  fromSession.getAuthenticated(state.session);
