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

export const recieveFriends = (response) => ({
  type: types.RECEIVE_FRIENDS,
  response,
});
