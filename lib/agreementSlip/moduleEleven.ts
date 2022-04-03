import { IResponseStructure } from "../interfaces/interfaces"
import { amountInDigitableLine, getExpirationDate } from "./utils/utils";

/**
 * @description - Get digitable
 * @param section - Union of first and second section
 * @returns - Calculate the digit validate
 */
const calculateDAC = (section: string): number => {
  let mult = 2;
  const sum = section.split('').reverse().reduce((acc, curr) => {
    let value = parseInt(curr) * mult;

    if (mult === 9) {
      mult = 2;
    } else {
      mult++;
    }
    return acc + value;
  }, 0)

  const remainder = sum % 11;

  return remainder;
}

/**
 * @description Calculate module 11 of the digitable line
 * @param digitableLine - The digitable line recived from request
 * @returns {IResponseStructure} - Return the response structure (Object: statusCode, body)
 */

export const moduleEleven = async (digitableLine: string): Promise<IResponseStructure> => {
  const firstSection = digitableLine.slice(0, 3);
  const secondSection = digitableLine.slice(4, 44);
  const digitValidateInDigitableLine = digitableLine.slice(3, 4);

  const calcDac = calculateDAC(firstSection + secondSection);

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
    })
  }
}
