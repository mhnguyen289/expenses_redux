import { combineReducers } from 'redux';
import * as types from '../constants/action_types';

const expenses = (state = {}, action) => {
  switch (action.type) {
    case types.ADD_EXPENSE:
      return {
        ...state,
        [action.friendId]: action.response,
      };
    case types.RECEIVE_EXPENSES:
      const nextState = { ...state };
      action.response.forEach(expense => {
        nextState[expense.friendId] = expense;
      });
      return nextState;
    default:
      return state;
  }
};

export default expenses;
