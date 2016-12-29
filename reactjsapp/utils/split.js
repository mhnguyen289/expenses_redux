import * as decimalUtil from '../utils/decimal';
import * as options from '../constants/split_options';

export const splitByPercent = (friends, amount) => {
  const split = friends.reduce((acc, item) => {
    acc[item.id] = decimalUtil.makeDecimal(amount * item.owed / 100);
    return acc;
  }, {});
  return split;
};

export const splitByExactAmount = friends => {
  const split = friends.reduce((acc, item) => {
    acc[item.id] = decimalUtil.makeDecimal(item.owed);
    return acc;
  }, {});
  return split;
};

export const splitEqually = (friends, amount) => {
  const split = friends.reduce((acc, item, index, array) => {
    acc[item.id] = decimalUtil.makeDecimal(amount / array.length);
    return acc;
  }, {});
  return split;
};

export const splitExpenses = (splitType, expense) => {
  const { friends, amount } = expense;
  switch (splitType) {
    case options.SPLIT_BY_PERCENT:
      return splitByPercent(friends, amount);
    case options.SPLIT_EXACT_AMOUNT:
      return splitByExactAmount(friends);
    case options.SPLIT_EQUALLY:
      return splitEqually(friends, amount);
    default:
      return {};
  }
};
