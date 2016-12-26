import * as types from '../constants/action_types';

export const receiveFriends = (response) => ({
  type: types.RECEIVE_FRIENDS,
  response,
});

const inviteSuccess = response => ({
  type: types.INVITE_SUCCESS,
  id: response.id,
  response,
});

export const receiveFriendsError = (error) => ({
  type: 'RECEIVE_FRIENDS_ERROR',
  error,
});

const inviteError = error => ({
  type: 'ERROR_INVITE',
  error,
});

export const fetchFriendsList = () => (dispatch) => {
  const url = 'api/friends_of';
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

export const inviteToJoin = email => dispatch => {
  const url = 'api/invite';
  const headers = { AUTHORIZATION: `Bearer ${localStorage.getItem('jwt')}` };
  $.ajax({
    url,
    method: 'POST',
    dataType: 'json',
    data: { invite: { email } },
    headers,
  })
  .done(response => {
    dispatch(inviteSuccess(response));
  })
  .fail(error => {
    dispatch(inviteError(error));
  });
};
