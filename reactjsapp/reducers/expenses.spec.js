import expect from 'expect';
import expenses, * as fromExpenses from './expenses';
import * as types from '../constants/action_types';

describe('expenses reducer', () => {
  it('should handle initial state', () => {
    expect(
      expenses(undefined, {})
    ).toEqual({});
  });
  
});
