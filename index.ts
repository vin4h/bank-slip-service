import { agreementTicketService } from './lib/agreementSlip/agreementSlip';
import { titleSlipValidate } from './lib/titleSlip/titleSlip';

type digitableLine = string;
export const bankSlipService = async (event: any) => {
  if (event.httpMethod != 'GET') {
    return {
      statusCode: 405,
      body: JSON.stringify({
        message: 'Method not allowed',
      }),
    }
  }

  const digitableLine: digitableLine = event.pathParameters.digitableLine;

  if (digitableLine.length === 47) {

    const { statusCode, body } = await titleSlipValidate(digitableLine);

    return {
      statusCode,
      body
    }
  } else if (digitableLine.toString().length === 48) {
    const { statusCode, body } = await agreementTicketService(digitableLine);

    return {
      statusCode,
      body
    }
  } else {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: 'Digitable line must have 47 or 48 characters',
      }),
    }
  }

};
