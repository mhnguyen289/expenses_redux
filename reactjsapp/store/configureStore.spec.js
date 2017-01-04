import configureStore from './configureStore';
import expect from 'expect';
import * as types from '../constants/action_types';

describe('store', () => {
  it('should handle initial state', () => {
    const store = configureStore();
    const actual = store.getState();
    const expected = {
      authenticated: false,
      debts: { byId: {}, allIds: [] },
      expenses: { byId: {}, allIds: [] },
      friends: { byId: {}, allIds: [] },
      message: '',
      savedExpense: false,
    };
    expect(actual).toEqual(expected);
  });

  it('should dispatch actions', () => {
    const store = configureStore();
    store.dispatch({
      type: types.SHOW_MESSAGE,
      message: 'Testing redux store',
    });
    const actual = store.getState();
    const expected = {
      authenticated: false,
      debts: { byId: {}, allIds: [] },
      expenses: { byId: {}, allIds: [] },
      friends: { byId: {}, allIds: [] },
      message: 'Testing redux store',
      savedExpense: false,
    };
    expect(actual).toEqual(expected);
  });

});
