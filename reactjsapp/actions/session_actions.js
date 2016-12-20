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
  const person = { username: 'DemoUserOne', password: 'DemoUser1Here' };
  const url = 'api/login';
  $.post(url, { user: person })
   .done(response => {
     localStorage.setItem('jwt', response.jwt);
     console.log(response);
     console.log(response.user);
     dispatch(loginSuccess(response.user));
   })
   .fail(error => {
     dispatch(errorLogin(error));
   });
};
