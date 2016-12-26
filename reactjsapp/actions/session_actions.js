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

const signUpSuccess = user => ({
  type: types.SIGNUP_SUCCESS,
  user,
});

export const showMessage = message => ({
  type: types.SHOW_MESSAGE,
  message,
});

export const clearMessage = () => ({
  type: types.CLEAR_MESSAGE,
});

const errorLogin = error => ({
  type: types.ERROR_LOGIN,
  error,
});

const errorSignUp = error => ({
  type: types.ERROR_SIGNUP,
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

export const login = (person) => (dispatch) => {
  const url = 'api/login';
  $.post(url, { user: person })
  .done(response => {
    if (response && response.jwt) {
      localStorage.setItem('jwt', response.jwt);
      dispatch(loginSuccess(response.user));
      dispatch(clearMessage());
    } else if (response.invalid) {
      dispatch(showMessage(response.invalid));
    }
  })
  .fail(error => {
    dispatch(errorLogin(error));
  });
};

export const signUp = (person) => (dispatch) => {
  const url = 'api/signup';
  $.post(url, { user: person })
   .done(response => {
     if (response && response.jwt) {
       localStorage.setItem('jwt', response.jwt);
       dispatch(signUpSuccess(response.user));
       dispatch(clearMessage());
     } else if (response.unique) {
       dispatch(showMessage(response.unique));
     }
   })
   .fail(error => {
     dispatch(errorSignUp(error));
   });
};
