import { IResponseStructure } from "../interfaces/interfaces";
import { moduleEleven } from "./moduleEleven";
import { moduleTen } from "./moduleTen";

/**
 *
 * @param digitableLine - The digitable line recived from request
 * @returns - True case in third position is 6 or 7, false otherwise
 */
const isModule10 = (digitableLine: string): boolean => {
  const firstSection = digitableLine.slice(0, 13);

  if(firstSection[4] === "6" || firstSection[4] === "7") {
    return true;
  } else {
    return false;
  }
}

/**
 *
 * @param digitableLine - The digitable line recived from request
 * @returns {IResponseStructure} - Return the response structure (Object: statusCode, body)
 */
export const agreementTicketService = async (digitableLine: string): Promise<IResponseStructure> => {
  if (isNaN(Number(digitableLine))) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: 'Digitable line must be a number',
      })
    }
  }

  if (isModule10(digitableLine)) {
    return moduleTen(digitableLine);
  } else {
    return moduleEleven(digitableLine);
  }

}
