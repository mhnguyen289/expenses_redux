import { combineReducers } from 'redux';
import * as types from '../constants/action_types';

const initialState = {
  authenticated: localStorage.getItem('jwt') ? true : false,
  user: {},
};

const authenticated = (
  state = initialState.authenticated, action
) => {
  switch (action.type) {
    case types.LOGOUT_SUCCESS:
      return false;
    case types.LOGIN_SUCCESS:
      return true;
    default:
      return state;
  }
};

const user = (state = {}, action) => {
  switch (action.type) {
    case types.LOGOUT_SUCCESS:
      return {};
    case types.LOGIN_SUCCESS:
      return action.user;
    default:
      return state;
  }
};

const session = combineReducers({
  authenticated,
  user,
});

export default session;

export const getAuthenticated = state => state.authenticated;
export const getUser = state => state.user;
