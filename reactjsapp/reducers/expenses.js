import { combineReducers } from 'redux';
import * as types from '../constants/action_types';

const byId = (state = {}, action) => {
  switch (action.type) {
    case types.ADD_EXPENSE:
      return {
        ...state,
        [action.id]: action.response,
      };
    case types.RECEIVE_EXPENSES:
      const nextState = { ...state };
      action.response.forEach(expense => {
        nextState[expense.id] = expense;
      });
      return nextState;
    default:
      return state;
  }
};

const allIds = (state = [], action) => {
  switch (action.type) {
    case types.ADD_EXPENSE:
      return [
        ...state,
        action.id,
      ];
    case types.RECEIVE_EXPENSES:
      return action.response.map(expense => expense.id);
    default:
      return state;
  }
};

const expenses = combineReducers({
  byId,
  allIds,
});

export default expenses;

export const getAllExpenses = state =>
  state.allIds.map(id => state.byId[id]);
