import * as types from '../constants/action_types';

const message = (state = '', action) => {
  switch (action.type) {
    case types.CLEAR_MESSAGE:
      return '';
    case types.SHOW_MESSAGE:
      return action.message;
    default:
      return state;
  }
};

export default message;
