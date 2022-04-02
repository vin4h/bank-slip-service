export const barCodeIsNumberValidate = (digitableLine: number): boolean => {
  if(digitableLine.toString().length < 47) {
    return false;
  } else if(isNaN(digitableLine)) {
    return false;
  } else {
    return true;
  }
}

export const currencyCode = (currency: number): boolean => {
  if (currency.toString()[3] === '9') {
    return true;
  } else {
    return false;
  }
}

export const validateDV = (digitableLine: number): number => {
  const digitValidate = digitableLine.toString().substring(4, 5);

  const headBarcode =
  digitableLine
  .toString()
  .slice(0, 4)
  .split('')
  .reverse()
  .join('');

  const tailBarcode =
  digitableLine
    .toString()
    .slice(5, 47)
    .split('')
    .reverse()
    .join('');



  let mult = 2;
  let sumTail = tailBarcode.split('').reduce((acc, cur) => {
    if (mult > 9) {
      mult = 0;
    }

    const value = Number(cur) * mult;

    ++mult;

    return (acc + value);
  }, 0);

  return sumTail  ;
}
