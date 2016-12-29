import expect from 'expect';
import * as splitUtil from './split';

describe('methods for splitting expenses among members', () => {
  const amount = '100.00';

  it('should handle splitting expenses equally', () => {
    const friends = [
      { id: 1, owed: '' },
      { id: 2, owed: '' },
    ];
    const actual = splitUtil.splitEqually(friends, amount);
    const expected = {
      1: '50',
      2: '50',
    };
    expect(actual).toEqual(expected);
  });

  it('should handle splitting expenses by percent', () => {
    const friends = [
      { id: 1, owed: '60' },
      { id: 2, owed: '40' },
    ];
    const actual = splitUtil.splitByPercent(friends, amount);
    const expected = {
      1: '60',
      2: '40',
    };
    expect(actual).toEqual(expected);
  });

  it('should handle splitting expenses by exact amount', () => {
    const friends = [
      { id: 1, owed: '55.63' },
      { id: 2, owed: '44.37' },
    ];
    const actual = splitUtil.splitByPercent(friends, amount);
    const expected = {
      1: '55.63',
      2: '44.37',
    };
    expect(actual).toEqual(expected);
  });
});
