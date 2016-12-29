import * as decimalUtil from '../utils/decimal';

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
