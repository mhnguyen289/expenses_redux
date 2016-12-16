import { combineReducers } from 'redux';
import * as types from '../constants/action_types';

const byId = (state = {}, action) => {
  switch (action.type) {
    case types.RECEIVE_FRIENDS:
      const nextState = { ...state };
      action.response.forEach(friend => {
        nextState[friend.id] = friend;
      });
      return nextState;
    default:
      return state;
  }
};

const allIds = (state = [], action) => {
  switch (action.type) {
    case types.RECEIVE_FRIENDS:
      return action.response.map(friend => friend.id);
    default:
      return state;
  }
};

const friends = combineReducers({
  byId,
  allIds,
});

export default friends;

export const getAllFriends = state =>
  state.allIds.map(id => state.byId[id]);
