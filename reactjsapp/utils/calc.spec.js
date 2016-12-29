import expect from 'expect';
import * as calcUtil from './calc';
import * as options from '../constants/split_options';

describe('resetting expenses', () => {
  it('should reset expenses for split by percent', () => {
    const split = {
      1: '30',
      2: '40',
    };
    const expense = {
      friends: [
        { id: 1, username: 'userone', owed: '30' },
        { id: 2, username: 'usertwo', owed: '40' },
      ],
      owed: '70.00',
      remaining: '30.00',
      title: 'Dinner',
      amount: '100.00',
      split,
    };
    const actual = calcUtil.resetExpense(options.SPLIT_BY_PERCENT, expense);
    const expected = {
      friends: [
        { id: 1, username: 'userone', owed: '' },
        { id: 2, username: 'usertwo', owed: '' },
      ],
      split: {},
      owed: '0.00',
      remaining: '100.00',
      title: 'Dinner',
      amount: '100.00',
    };
    expect(actual).toEqual(expected);
  });

  it('should reset expenses for split by exact', () => {
    const split = {
      1: '30',
      2: '40',
    };
    const expense = {
      friends: [
        { id: 1, username: 'userone', owed: '30' },
        { id: 2, username: 'usertwo', owed: '40' },
      ],
      owed: '70.00',
      remaining: '530.00',
      title: 'Dinner',
      amount: '600.00',
      split,
    };
    const actual = calcUtil.resetExpense(options.SPLIT_EXACT_AMOUNT, expense);
    const expected = {
      friends: [
        { id: 1, username: 'userone', owed: '' },
        { id: 2, username: 'usertwo', owed: '' },
      ],
      split: {},
      owed: '0.00',
      remaining: '600.00',
      title: 'Dinner',
      amount: '600.00',
    };
    expect(actual).toEqual(expected);
  });
});

describe('get initial remaining', () => {
  it('should handle split by percent', () => {
    const expense = {
      amount: '360.00',
    };
    const actual = calcUtil.getInitialRemaining(options.SPLIT_BY_PERCENT, expense);
    const expected = '100.00';
    expect(actual).toEqual(expected);
  });

  it('should handle split exact amount', () => {
    const expense = {
      amount: '360.00',
    };
    const actual = calcUtil.getInitialRemaining(options.SPLIT_EXACT_AMOUNT, expense);
    const expected = '360.00';
    expect(actual).toEqual(expected);
  });
  it('should handle split equally', () => {
    const expense = {
      amount: '360.00',
    };
    const actual = calcUtil.getInitialRemaining(options.SPLIT_EQUALLY, expense);
    const expected = '360.00';
    expect(actual).toEqual(expected);
  });
});
