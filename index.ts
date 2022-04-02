import { titleSlipValidate } from './lib/titleSlipValidate';

type digitableLine = number;
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

  if (digitableLine.toString().length === 47) {
    await titleSlipValidate(digitableLine);
  } else if (digitableLine.toString().length === 48) {

  } else {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: 'Digitable not contains 47 numbers',
      }),
    }
  }

};
