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
  user: {
    username: user.username,
    hasTopics: user.has_topics,
  },
});

const signUpSuccess = user => ({
  type: types.SIGNUP_SUCCESS,
  user: {
    username: user.username,
    hasTopics: false,
  },
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

const errorSignUp = error => ({
  type: types.ERROR_SIGNUP,
  error,
});

export const demo = () => (dispatch) => {
  const person = { username: 'DemoUserOne', password: 'DemoUser1Here' };
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
