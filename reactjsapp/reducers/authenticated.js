import * as types from '../constants/action_types';

const initialState = {
  authenticated: localStorage.getItem('jwt') ? true : false,
};

const authenticated = (
  state = initialState.authenticated, action
) => {
  switch (action.type) {
    case types.ERROR_SIGNUP:
    case types.ERROR_LOGIN:
    case types.LOGOUT_SUCCESS:
      return false;
    case types.SIGNUP_SUCCESS:
    case types.LOGIN_SUCCESS:
      return true;
    default:
      return state;
  }
};

export default authenticated;
