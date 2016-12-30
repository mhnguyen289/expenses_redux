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

describe('update expense', () => {
  const getUpdatedExpense = (
    splitOption,
    amount,
    remaining = '0.00',
    friendId = '',
    owedValue = '') => {
    const expense = {
      friends: [
        { id: 1, username: 'userone', owed: '' },
        { id: 2, username: 'usertwo', owed: '' },
      ],
      owed: '0.00',
      remaining,
      title: 'Lunch',
      amount,
      split: {},
    };
    return calcUtil.updateExpense(splitOption, expense, friendId, owedValue);
  };

  it('should update expense split by percent', () => {
    const friendId = 2;
    const owedValue = '40';
    const remaining = '60.00';
    const amount = '100.00';
    const actual = getUpdatedExpense(
      options.SPLIT_BY_PERCENT, amount, remaining, friendId, owedValue);
    const expected = {
      friends: [
        { id: 1, username: 'userone', owed: '' },
        { id: 2, username: 'usertwo', owed: '40' },
      ],
      owed: '40',
      remaining: '60',
      title: 'Lunch',
      amount: '100.00',
      split: {
        1: '0.01',
        2: '40.01',
      },
    };
    expect(actual).toEqual(expected);
  });

  it('should update expense split by exact amount', () => {
    const friendId = 2;
    const owedValue = '23.90';
    const remaining = '50.00';
    const amount = '50.00';
    const actual = getUpdatedExpense(
      options.SPLIT_EXACT_AMOUNT, remaining, amount, friendId, owedValue);
    const expected = {
      friends: [
        { id: 1, username: 'userone', owed: '' },
        { id: 2, username: 'usertwo', owed: '23.90' },
      ],
      owed: '23.90',
      remaining: '26.10',
      title: 'Lunch',
      amount: '50.00',
      split: {
        1: '0.01',
        2: '23.91',
      },
    };
    expect(actual).toEqual(expected);
  });

  it('should update expense, split equally', () => {
    const actual = getUpdatedExpense(options.SPLIT_EQUALLY, '30.00');
    const expected = {
      friends: [
        { id: 1, username: 'userone', owed: '15' },
        { id: 2, username: 'usertwo', owed: '15' },
      ],
      owed: '30',
      remaining: '0',
      title: 'Lunch',
      amount: '30.00',
      split: {
        1: '15',
        2: '15',
      },
    };
    expect(actual).toEqual(expected);
  });

  it('should distribute remaing cents, case .01', () => {
    const actual = getUpdatedExpense(options.SPLIT_EQUALLY, '78.01');
    const actualSplit = actual.split;
    const expectedSplit = { 1: '39.01', 2: '39' };
    expect(actualSplit).toEqual(expectedSplit);
  });

  it('should distribute remaing cents, case .02', () => {
    const actual = getUpdatedExpense(options.SPLIT_EQUALLY, '78.02');
    const actualSplit = actual.split;
    const expectedSplit = { 1: '39.01', 2: '39.01' };
    expect(actualSplit).toEqual(expectedSplit);
  });

  it('should distribute remaing cents, case .03', () => {
    const actual = getUpdatedExpense(options.SPLIT_EQUALLY, '78.03');
    const actualSplit = actual.split;
    const expectedSplit = { 1: '39.02', 2: '39.01' };
    expect(actualSplit).toEqual(expectedSplit);
  });

  it('should distribute remaing cents, case .04', () => {
    const actual = getUpdatedExpense(options.SPLIT_EQUALLY, '78.04');
    const actualSplit = actual.split;
    const expectedSplit = { 1: '39.02', 2: '39.02' };
    expect(actualSplit).toEqual(expectedSplit);
  });

  it('should distribute remaing cents, case .05', () => {
    const actual = getUpdatedExpense(options.SPLIT_EQUALLY, '78.05');
    const actualSplit = actual.split;
    const expectedSplit = { 1: '39.03', 2: '39.02' };
    expect(actualSplit).toEqual(expectedSplit);
  });

  it('should distribute remaing cents, case .06', () => {
    const actual = getUpdatedExpense(options.SPLIT_EQUALLY, '78.06');
    const actualSplit = actual.split;
    const expectedSplit = { 1: '39.03', 2: '39.03' };
    expect(actualSplit).toEqual(expectedSplit);
  });

  it('should distribute remaing cents, case .07', () => {
    const actual = getUpdatedExpense(options.SPLIT_EQUALLY, '78.07');
    const actualSplit = actual.split;
    const expectedSplit = { 1: '39.04', 2: '39.03' };
    expect(actualSplit).toEqual(expectedSplit);
  });

  it('should distribute remaing cents, case .08', () => {
    const actual = getUpdatedExpense(options.SPLIT_EQUALLY, '78.08');
    const actualSplit = actual.split;
    const expectedSplit = { 1: '39.04', 2: '39.04' };
    expect(actualSplit).toEqual(expectedSplit);
  });

  it('should distribute remaing cents, case .09', () => {
    const actual = getUpdatedExpense(options.SPLIT_EQUALLY, '78.09');
    const actualSplit = actual.split;
    const expectedSplit = { 1: '39.05', 2: '39.04' };
    expect(actualSplit).toEqual(expectedSplit);
  });

  it('should distribute remaing cents, case .10', () => {
    const actual = getUpdatedExpense(options.SPLIT_EQUALLY, '78.10');
    const actualSplit = actual.split;
    const expectedSplit = { 1: '39.05', 2: '39.05' };
    expect(actualSplit).toEqual(expectedSplit);
  });
});
