import expect from 'expect';
import expenses from './expenses';
import * as types from '../constants/action_types';

describe('expenses reducer', () => {
  it('should handle initial state', () => {
    expect(
      expenses(undefined, {})
    ).toEqual({
      allIds: [],
      byId: {},
    });
  });

  it('should handle ADD_EXPENSE', () => {
    expect(
      expenses({
        allIds: [],
        byId: {},
      }, {
        type: types.ADD_EXPENSE,
        id: 1,
        response: {
          id: 1,
          title: 'Movies',
          expense_amount: '30.00',
          paid_by_id: 3,
          debt_amount: '15.00',
          borrower_id: 1,
        },
      })
    ).toEqual({
      allIds: [1],
      byId: {
        1:
        {
          id: 1,
          title: 'Movies',
          expense_amount: '30.00',
          paid_by_id: 3,
          debt_amount: '15.00',
          borrower_id: 1,
        },
      },
    });
  });
});
