import { combineReducers } from 'redux';
import * as types from '../constants/action_types';

const byId = (state = {}, action) => {
  switch (action.type) {
    case types.RECEIVE_DEBTS:
      const nextState = { ...state };
      action.response.forEach(debt => {
        nextState[debt.id] = debt;
      });
      return nextState;
    default:
      return state;
  }
};

const allIds = (state = [], action) => {
  switch (action.type) {
    case types.RECEIVE_DEBTS:
      return action.response.map(debt => debt.id);
    default:
      return state;
  }
};

const debts = combineReducers({
  byId,
  allIds,
});

export default debts;

export const getAllDebts = state =>
  state.allIds.map(id => state.byId[id]);
