import { IFieldsToCalculate, ISumFields } from "./interfaces";

export const barCodeIsNumberValidate = (digitableLine: number): boolean => {
  if(digitableLine.toString().length != 47) {
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

const getFieldsToCalculate = (digitableLine: number): IFieldsToCalculate => {

  const firstFieldCalculate =
    digitableLine
    .toString()
    .slice(0, 9)
    .split('')
    .reverse()
    .join('')

  const secondFieldCalculate =
    digitableLine
    .toString()
    .slice(10, 20)
    .split('')
    .reverse()
    .join('')

  const thirdFieldCalculate =
    digitableLine
    .toString()
    .slice(21, 31)
    .split('')
    .reverse()
    .join('')

  return {
    firstFieldCalculate,
    secondFieldCalculate,
    thirdFieldCalculate,
  };
}

const exceededMultiplierValue = (value: number) => {
  let sum = 0;
  value.toString().split('').map(item => {
    sum += parseInt(item);
  })
  return sum;
}

const sumFields = ({firstFieldCalculate, secondFieldCalculate, thirdFieldCalculate}: IFieldsToCalculate): ISumFields => {
  let mult = 2;

  const sumFirstField = firstFieldCalculate.split('').reduce((acc, curr) => {
    let value = parseInt(curr) * mult;
    if (mult === 2) {
      mult = 1;
    } else {
      mult++
    }

    if (value > 9) {
      value = exceededMultiplierValue(value);
    }

    return acc + value;
  }, 0);

  mult = 2;

  const sumSecondField = secondFieldCalculate.split('').reduce((acc, curr) => {
    let value = parseInt(curr) * mult;
    if (mult === 2) {
      mult = 1;
    } else {
      mult++
    }

    if (value > 9) {
      value = exceededMultiplierValue(value);
    }

    return acc + value;
  }, 0);

  mult = 2;

  const sumThirdField = thirdFieldCalculate.split('').reduce((acc, curr) => {
    let value = parseInt(curr) * mult;
    if (mult === 2) {
      mult = 1;
    } else {
      mult++
    }

    if (value > 9) {
      value = exceededMultiplierValue(value);
    }

    return acc + value;
  }, 0);

  return {
    sumFirstField,
    sumSecondField,
    sumThirdField,
  };
}

const calculateDigit = (value: number): number => {
  let nextTen = Math.ceil(value / 10) * 10;
  let lastTen = (Math.ceil(value / 10) * 10) - 10;

  let divisionRemainder = nextTen - (value % 10) - lastTen;

  return divisionRemainder;
}

const digitIsVallid = (firstDigit: number, secondDigit: number, thirdDigit: number, digitableLine: number): boolean => {
  const firstNumberDigitValid = parseInt(digitableLine.toString()[9]);
  const secondNumberDigitValid = parseInt(digitableLine.toString()[20]);
  const thirdNumberDigitValid = parseInt(digitableLine.toString()[31]);
  if(firstNumberDigitValid === firstDigit && secondNumberDigitValid === secondDigit && thirdNumberDigitValid === thirdDigit) {
    return true;
  } else {
    return false
  }
}


export const validateDigitDigitableLine = (digitableLine: number): boolean => {
  const { firstFieldCalculate, secondFieldCalculate, thirdFieldCalculate } = getFieldsToCalculate(digitableLine);

  const { sumFirstField, sumSecondField, sumThirdField }: ISumFields = sumFields({ firstFieldCalculate, secondFieldCalculate, thirdFieldCalculate });

  const digitValidFirstField = calculateDigit(sumFirstField);

  const digitValidSecondField = calculateDigit(sumSecondField);

  const digitValidThirdField = calculateDigit(sumThirdField);

  const isValid = digitIsVallid(digitValidFirstField, digitValidSecondField, digitValidThirdField, digitableLine);

  return isValid;

}

export const convertDigitableLineInBarCode = (digitableLine: number): string => {
  const firstSection = digitableLine.toString().substring(0, 4);
  const secondSection = digitableLine.toString().substring(4, 9);
  const thirdSection = digitableLine.toString().substring(10, 16);
  const fourthSection = digitableLine.toString().substring(16, 20);
  const fifthSection = digitableLine.toString().substring(21, 31);
  const sixthSection = digitableLine.toString().substring(32, 47);

  return firstSection.concat(sixthSection, secondSection,thirdSection ,fourthSection ,fifthSection)
}
