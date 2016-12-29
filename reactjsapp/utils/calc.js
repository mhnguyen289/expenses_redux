import * as splitUtil from '../utils/split';
import * as decimalUtil from '../utils/decimal';
import * as options from '../constants/split_options';

const distributeRemainingCents = (expense) => {
  let remaining = expense.remaining;
  let owed = 0.00;
  expense.friends.forEach(friend => {
    if (remaining > 0.00) {
      owed = Number(friend.owed);
      owed += 0.01;
      owed = decimalUtil.roundUpFromThousandths(owed);
      friend.owed = decimalUtil.addZeroToDecimalEnding(owed);
      remaining -= 0.01;
    }
  });
  expense.remaining = remaining.toString();
  expense.split = expense.friends.reduce((acc, item) => {
    acc[item.id] = item.owed;
    return acc;
  }, {});
  return expense;
};

const percentDistributeRemainingCents = expense => {
  const split = expense.split;
  const keys = Object.keys(expense.split);
  let totalOwed = 0;
  for (let i = 0; i < keys.length; i++) {
    totalOwed += Number(split[keys[i]]);
  }
  let owed = 0;
  let remaining = Number(expense.amount) - totalOwed;
  remaining = decimalUtil.roundUpFromThousandths(remaining);
  keys.forEach(key => {
    if (remaining > 0.00) {
      owed = Number(split[key]);
      owed += 0.01;
      owed = decimalUtil.roundUpFromThousandths(owed);
      split[key] = decimalUtil.addZeroToDecimalEnding(owed);
      remaining -= 0.01;
    }
  });
  return expense.split;
};

// do not export this get initial remaining, place the code that needs it, here,
export const getInitialRemaining = (selectedSplitOption, expense) => {
  const byPercent = (selectedSplitOption === options.SPLIT_BY_PERCENT);
  return byPercent ? '100.00' : expense.amount;
};

const calculateRemaining = (expense, initialRemaining) => {
  let totalOwed = 0;
  const owedNum = 0.00;
  expense.friends.forEach((item) => {
    if (item.owed.length == 0) {
      totalOwed += owedNum;
    } else {
      totalOwed += Number(item.owed);
    }
  });
  const remaining = Number(initialRemaining) - totalOwed;
  expense.owed = totalOwed.toString();
  expense.remaining = decimalUtil.roundUpFromThousandths(remaining);
  return expense;
};

export const updateByCalculator = (splitOption, expense) => {
  expense.split = splitUtil.splitExpenses(splitOption, expense);
  expense.friends.forEach(friend => {
    friend.owed = expense.split[friend.id];
  });
  const initialRemaining = expense.amount;
  expense = calculateRemaining(expense, initialRemaining);
  if (expense.remaining > 0.00) {
    expense = distributeRemainingCents(expense);
  }
  return expense;
};

export const updateByInput = (splitOption, expense, friendId, owedValue) => {
  expense.friends.forEach((item) => {
    if (item.id === Number(friendId)) {
      item.owed = owedValue;
    }
  });
  const initialRemaining = getInitialRemaining(splitOption, expense);
  expense = calculateRemaining(expense, initialRemaining);
  expense.split = splitUtil.splitExpenses(splitOption, expense);
  expense.split = percentDistributeRemainingCents(expense);
  return expense;
};

export const updateExpense = (splitOption, expense, friendId, owedValue) => {
  switch (splitOption) {
    case options.SPLIT_BY_PERCENT:
    case options.SPLIT_EXACT_AMOUNT:
      return updateByInput(splitOption, expense, friendId, owedValue);
    case options.SPLIT_EQUALLY:
      return updateByCalculator(splitOption, expense);
    default:
      return {};
  }
};
