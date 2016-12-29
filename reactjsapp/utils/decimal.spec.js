import expect from 'expect';
import * as decimalUtil from './decimal';

describe('decimal utility functions', () => {
  it('should round from the thousands place', () => {
    const value = '0.0099999';
    const actual = decimalUtil.roundUpFromThousandths(value);
    const expected = '0.01';
    expect(actual).toEqual(expected);
  });

  it('should add zero to decimal ending in single digit', () => {
    const value = '78.9';
    const actual = decimalUtil.addZeroToDecimalEnding(value);
    const expected = '78.90';
    expect(actual).toEqual(expected);
  });

  it('should make decimal for money representation', () => {
    const value = '78.9134456';
    const actual = decimalUtil.makeDecimal(value);
    const expected = '78.91';
    expect(actual).toEqual(expected);
  });

  it('should make decimal for money representation, case #2', () => {
    const value = '78.919999';
    const actual = decimalUtil.makeDecimal(value);
    const expected = '78.91';
    expect(actual).toEqual(expected);
  });
});
