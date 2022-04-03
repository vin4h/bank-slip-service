import { IResponseStructure } from "../interfaces/interfaces";
import { moduleTen } from "./moduleTen";

/**
 * @description The main function to validate the title slip and your returns cases
 * @param {number} digitableLine - The digitable line recived from request
 * @returns {IResponseStructure} - Return object with status code and object with error message our {barCode, amount, expirationDate}
 */
export const titleSlipValidate = async (digitableLine: string): Promise<IResponseStructure> => {
  if (isNaN(Number(digitableLine))) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: 'Digitable line must be a number',
      })
    }
  }

  return moduleTen(digitableLine);
}
