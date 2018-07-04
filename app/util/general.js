export const performDivisibility = (balance, divisibility) => {
  for (let i = 0; i < divisibility; i++) {
    balance = balance / 10;
  }
  return balance;
};

export const standardizeString = string => {
  if (string) {
    return (string.charAt(0).toUpperCase() + string.slice(1)).replace('_', ' ');
  }
  return '';
};

export const snakeString = string => {
  console.log(string);
  if (string) {
    return string.toLowerCase().replace(' ', '_');
  }
  return '';
};
