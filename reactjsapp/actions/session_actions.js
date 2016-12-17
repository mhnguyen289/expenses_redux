import * as types from '../constants/action_types';

export const showMessage = message => ({
  type: types.SHOW_MESSAGE,
  message,
});

export const clearMessage = () => ({
  type: types.CLEAR_MESSAGE,
});

const loginSuccess = user => ({
  type: types.LOGIN_SUCCESS,
  user,
});

export const logout = () => {
  localStorage.removeItem('jwt');
  return {
    type: types.LOGOUT_SUCCESS,
  };
};

const errorLogin = error => ({
  type: types.ERROR_LOGIN,
  error,
});

export const demo = () => (dispatch) => {
  const person = { username: 'DemoUserOne', password: 'DemoUser1Here' };
  const url = 'api/login';
  $.post(url, { user: person })
   .done(response => {
     localStorage.setItem('jwt', response.jwt);
     dispatch(loginSuccess(response.user));
   })
   .fail(error => {
     dispatch(errorLogin(error));
   });
};
