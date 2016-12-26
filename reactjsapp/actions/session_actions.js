import * as types from '../constants/action_types';

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
  const person = { email: 'demo123@example.com', password: 'DemoUser' };
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
