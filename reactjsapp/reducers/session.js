import { combineReducers } from 'redux';
import * as types from '../constants/action_types';

const initialState = {
  authenticated: localStorage.getItem('jwt') ? true : false,
  currentUser: {},
};

const authenticated = (
  state = initialState.authenticated, action
) => {
  switch (action.type) {
    case types.LOGOUT_SUCCESS:
      return false;
    case types.LOGIN_SUCCESS:
    case types.SIGNUP_SUCCESS:
      return true;
    default:
      return state;
  }
};

const currentUser = (state = initialState.currentUser, action) => {
  switch (action.type) {
    case types.LOGIN_SUCCESS:
    case types.SIGNUP_SUCCESS:
      return action.user;
    case types.ADD_FOLLOW:
    case types.REMOVE_FOLLOW:
      return {
        ...state,
        hasTopics: action.user.hasTopics,
      };
    case types.LOGOUT_SUCCESS:
      return {};
    default:
      return state;
  }
};

const session = combineReducers({
  authenticated,
  currentUser,
});

export default session;

export const getCurrentUser = state => state.currentUser;
export const getAuthenticated = state => state.authenticated;
