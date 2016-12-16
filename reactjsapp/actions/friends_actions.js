import * as types from '../constants/action_types';

export const inviteFriend = (response) => ({
  type: types.INVITE_FRIEND,
  id: response.id,
  response,
});

export const acceptFriend = (response) => ({
  type: types.ACCEPT_FRIEND,
  id: response.id,
  response,
});

export const declineFriend = (response) => ({
  type: types.DECLINE_FRIEND,
  id: response.id,
  response,
});

export const receiveFriends = (response) => ({
  type: types.RECEIVE_FRIENDS,
  response,
});

export const receiveFriendsError = (error) => ({
  type: 'RECEIVE_FRIENDS_ERROR',
  error,
});

export const fetchFriendsOf = (userId) => (dispatch) => {
  const url = `api/friends/${userId}/`;
  fetch(url)
      .then(response => response.json())
      .then(json => dispatch(receiveFriends(json)))
      .catch(error => dispatch(receiveFriendsError(error)));
};
