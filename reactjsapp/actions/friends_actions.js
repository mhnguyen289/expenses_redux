import * as types from '../constants/action_types';

export const receiveFriends = (response) => ({
  type: types.RECEIVE_FRIENDS,
  response,
});

export const receiveFriendsError = (error) => ({
  type: 'RECEIVE_FRIENDS_ERROR',
  error,
});

export const fetchFriendsList = () => (dispatch) => {
  const url = 'api/friends_of_current_user';
  const headers = { AUTHORIZATION: `Bearer ${localStorage.getItem('jwt')}` };
  $.ajax({
    url,
    method: 'GET',
    headers,
  })
  .done(response => {
    dispatch(receiveFriends(response));
  })
  .fail(error => {
    dispatch(receiveFriendsError(error));
  });
};
