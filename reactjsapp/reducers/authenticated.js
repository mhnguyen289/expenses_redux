import * as types from '../constants/action_types';

const initialState = {
  authenticated: localStorage.getItem('jwt') ? true : false,
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

export default authenticated;
