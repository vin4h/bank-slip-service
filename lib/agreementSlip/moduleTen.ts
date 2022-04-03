import { IResponseStructure } from "../interfaces/interfaces";
import { amountInDigitableLine, getExpirationDate } from "./utils/utils";


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
 * @description - Get digitable
 * @param section - Union of first and second section
 * @returns - Calculate the digit validate
 */
const calculateDAC = (section: string): number => {
  let mult = 2;
  const sum = section.split('').reduce((acc:number, curr) => {
    let value = parseInt(curr) * mult;

    if (mult === 2) {
      mult = 1;
    } else {
      mult++;
    }

    if (value > 9) {
      value = exceededMultiplierValue(value);
    }

    return acc + value;
  }, 0)

  const remainder = sum % 10;

  return 10 - remainder;
}

/**
 * @description Calculate module 10 of the digitable line
 * @param digitableLine - The digitable line recived from request
 * @returns {IResponseStructure} - Return the response structure (Object: statusCode, body)
 */
export const moduleTen = async (digitableLine: string): Promise<IResponseStructure> => {
  const firstSection = digitableLine.slice(0, 3);
  const secondSection = digitableLine.slice(4, 44);
  const digitValidateInDigitableLine = digitableLine.slice(3, 4);
  const calcDac = calculateDAC(firstSection + secondSection);
  console.log(calcDac);
  console.log(digitValidateInDigitableLine);


  if (calcDac != parseInt(digitValidateInDigitableLine)) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: 'Validate digit in digitable line is not valid',
      })
    }
  }

  const lastSectionBarCode = digitableLine.slice(4, 40);

  const barCode = firstSection.concat(secondSection, calcDac.toString(), lastSectionBarCode);

  const amount = amountInDigitableLine(digitableLine);

  const expirationDate = getExpirationDate(digitableLine);

  return {
    statusCode: 200,
    body: JSON.stringify({
      barCode,
      amount,
      expirationDate,
    }),
  }
}
