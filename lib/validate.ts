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

export const validateDV = (barCode: string): number => {
  const digitValidate = barCode.substring(4, 5);

  const headBarcode =
  barCode
  .slice(0, 4)
  .split('')
  .reverse()
  .join('');

  const tailBarcode =
  barCode
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

export const convertDigitableLineInBarCode = (digitableLine: number): string => {
  const section1 = digitableLine.toString().substring(0, 4);
  const section2 = digitableLine.toString().substring(4, 9);
  const section3 = digitableLine.toString().substring(10, 16);
  const section4 = digitableLine.toString().substring(16, 20);
  const section5 = digitableLine.toString().substring(21, 31);
  const section6 = digitableLine.toString().substring(32, 47);

  return section1 + section6 + section2 + section3 + section4 + section5;
}
