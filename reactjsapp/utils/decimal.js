export const roundUpFromThousandths = value =>
  (Math.round(value * 1000) / 1000).toString();

export const addZeroToDecimalEnding = withDecimal => {
  let amount = withDecimal.toString();
  const idx = amount.indexOf('.');
  if (idx !== -1) {
    const decimal = amount.slice(idx + 1);
    if (decimal.length === 1) {
      amount = `${amount}0`;
    }
  }
  return amount;
};

export const makeDecimal = number => {
  let num = Number(number);
  num = roundUpFromThousandths(num);
  num = Math.trunc(number * 100);
  num /= 100;
  let str = num.toString();
  str = addZeroToDecimalEnding(str);
  return str;
};
