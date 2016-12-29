import expect from 'expect';
import * as splitUtil from './split';

describe('methods for splitting expenses among members', () => {
  it('should handle splitting expenses equally', () => {
    const amount = '360.00';
    const friends = [
      { id: 1, owed: '' },
      { id: 2, owed: '' },
    ];
    const actual = splitUtil.splitEqually(friends, amount);
    const expected = {
      1: '180',
      2: '180',
    };
    expect(actual).toEqual(expected);
  });

  it('should handle splitting expenses by percent', () => {
    const amount = '80.00';
    const friends = [
      { id: 1, owed: '60' },
      { id: 2, owed: '40' },
    ];
    const actual = splitUtil.splitByPercent(friends, amount);
    const expected = {
      1: '48',
      2: '32',
    };
    expect(actual).toEqual(expected);
  });

  it('should handle splitting expenses by exact amount', () => {
    const amount = '100.00';
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
