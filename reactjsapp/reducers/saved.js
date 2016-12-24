import * as types from '../constants/action_types';

const saved = (state = false, action) => {
  switch (action.type) {
    case types.ADD_EXPENSE:
      return true;
    case types.RECEIVE_EXPENSES:
    case types.ERROR_ADD_EXPENSE:
      return false;
    default:
      return state;
  }
};

export default saved;
