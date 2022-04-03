import { IConvertInBarCode, IFieldsToCalculate, IResponseStructure, ISumFields } from "../interfaces/interfaces";

/**
 * @description Get fields to calculate the validate digit of the title slip
 * @param digitableLine - The digitable line recived from request
 * @returns {IFieldsToCalculate} - Return three strings with the fields to calculate
 */
 const getFieldsToCalculate = (digitableLine: string): IFieldsToCalculate => {

  const firstFieldCalculate =
    digitableLine
      .slice(0, 9)
      .split('')
      .reverse()
      .join('')

  const secondFieldCalculate =
    digitableLine
      .slice(10, 20)
      .split('')
      .reverse()
      .join('')

  const thirdFieldCalculate =
    digitableLine
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

/**
 * @description Case the sum of the fields is greater than 9, the value exceeded separates into indices and sums them up
 * @param value - The value to be calculated
 * @returns {number} - Return the sum of the values exceeded
 */
 const exceededMultiplierValue = (value: number): number => {
  let sum = 0;
  value.toString().split('').map(item => {
    sum += parseInt(item);
  })
  return sum;
}

/**
 * @description Sum the fields to calculate the validate digit of the title slip
 * @param {IFieldsToCalculate} fieldsToCalculate - The fields to calculate
 * @returns {ISumFields} - Return the sum of the fields to calculate validate digits
*/
const sumFields = ({ firstFieldCalculate, secondFieldCalculate, thirdFieldCalculate }: IFieldsToCalculate): ISumFields => {
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

/**
 * @description Calculate the validate digit of the title slip
 * @param {number} value - The value to be calculated in sumFields()
 * @returns {number} - Return the validate digit
*/
const calculateDigit = (value: number): number => {
  let nextTen = Math.ceil(value / 10) * 10;
  let lastTen = (Math.ceil(value / 10) * 10) - 10;

  let divisionRemainder = nextTen - (value % 10) - lastTen;

  return divisionRemainder;
}

/**
 * @description Validate the digit of the title slip is equals to the digit calculated after sun fields
 * @param {number} firstDigit - The first digit calculated
 * @param {number} secondDigit - The second digit calculated
 * @param {number} thirdDigit - The third digit calculated
 * @param {number} digitableLine - The digitable line recived from request
 * @returns {boolean} - Returns true if the digit is equal to the digit entered in the request
 */
const digitIsValid = (firstDigit: number, secondDigit: number, thirdDigit: number, digitableLine: string): boolean => {
  const firstNumberDigitValid = parseInt(digitableLine[9]);
  const secondNumberDigitValid = parseInt(digitableLine[20]);
  const thirdNumberDigitValid = parseInt(digitableLine[31]);
  if (firstNumberDigitValid === firstDigit && secondNumberDigitValid === secondDigit && thirdNumberDigitValid === thirdDigit) {
    return true;
  } else {
    return false
  }
}

/**
 * @description Validate the digit in digitable line
 * @param {number} digitableLine - The digitable line recived from request
 * @returns {boolean} - returns true fetch fields to calculate, add the get fields, calculate each section and validate the digits as informed in the request. If not return false
 */
const validateDigitInDigitableLine = (digitableLine: string): boolean => {
  const { firstFieldCalculate, secondFieldCalculate, thirdFieldCalculate } = getFieldsToCalculate(digitableLine);

  const { sumFirstField, sumSecondField, sumThirdField }: ISumFields = sumFields({ firstFieldCalculate, secondFieldCalculate, thirdFieldCalculate });

  const digitValidFirstField = calculateDigit(sumFirstField);

  const digitValidSecondField = calculateDigit(sumSecondField);

  const digitValidThirdField = calculateDigit(sumThirdField);

  const isValid = digitIsValid(digitValidFirstField, digitValidSecondField, digitValidThirdField, digitableLine);

  return isValid;
}

/**
 * @description Sum informed in the last ten champions of the digitable line
 * @param {string} value - The value to be calculated
 * @returns {string} - Return the sum
 */
 const amountInDigitableLine = (value: string): string => {
  const lastDigits = value.split('').join('').slice(5, 13);
  const decimal = value.slice(13,15);
  const amount = parseFloat(lastDigits).toFixed(0).concat("." + decimal);
  return amount;
}

/**
 * @description Convert digitable line em sections
 * @param {number} digitableLine - The digitable line recived from request
 * @returns {IConvertInBarCode} - Return bar code and object contains each section in the digitable line
*/
const convertDigitableLineInBarCode = (digitableLine: string): IConvertInBarCode => {
  const firstSection = digitableLine.substring(0, 4);
  const secondSection = digitableLine.substring(4, 9);
  const thirdSection = digitableLine.substring(10, 16);
  const fourthSection = digitableLine.substring(16, 20);
  const fifthSection = digitableLine.substring(21, 31);
  let sixthSection = "";
  if (digitableLine.length === 47) {
    sixthSection = digitableLine.substring(32, 47);
  } else {
    sixthSection = digitableLine.substring(32, 48);
  }

  const barCode = firstSection.concat(sixthSection, secondSection, thirdSection, fourthSection, fifthSection);
  const partialsBarCode = {
    firstSection,
    secondSection,
    thirdSection,
    fourthSection,
    fifthSection,
    sixthSection
  }

  return {
    barCode,
    partialsBarCode
  }
}


/**
 * @description Find the expiration date in sixth section of the digitable line
 * @param {string} value - The value to be convert in default date format
 * @returns {string} - Return the expiration date
 */
 const getExpirationDate = (value: string): string => {
  let fixedDate = new Date("07-03-2000");

  let factor = parseInt(value.slice(1, 5));

  let expirationDate = 0;
  let convertedDate = "";

  if (factor > 9999) {
    fixedDate = new Date("02-22-2025");
    factor = factor % 9999 + 1000;
  }

  if (factor < 1000) {
    fixedDate = new Date("10-07-1997");
    expirationDate = fixedDate.setDate(fixedDate.getDate() + factor);

    convertedDate = new Date(expirationDate).toLocaleDateString().split("/").reverse().join("-");

    return convertedDate;
  }

  if (factor === 1000) {
    return fixedDate.toLocaleDateString().split("/").reverse().join("-");
  }


  expirationDate = fixedDate.setDate(fixedDate.getDate() + (factor - 1000));

  convertedDate = new Date(expirationDate).toLocaleDateString().split("/").reverse().join("-");

  return convertedDate;
}

/**
 * @description Calculate module 10 of the digitable line
 * @param digitableLine - The digitable line recived from request
 * @returns {IResponseStructure} - Return the response structure (Object: statusCode, body)
 */
export const moduleTen = async(digitableLine: string): Promise<IResponseStructure> => {
  const dv = validateDigitInDigitableLine(digitableLine);

  if (!dv) {
     return {
      statusCode: 400,
      body: JSON.stringify({
        message: 'Validator digits on digital line are not valid',
      })
    }
  }

  const { barCode, partialsBarCode }: IConvertInBarCode = convertDigitableLineInBarCode(digitableLine);

  const amount = amountInDigitableLine(partialsBarCode.sixthSection);

  const expirationDate = getExpirationDate(partialsBarCode.sixthSection);

  return {
    statusCode: 200,
    body: JSON.stringify({
      barCode,
      amount,
      expirationDate,
    }),
  }
}
