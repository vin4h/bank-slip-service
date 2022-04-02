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

  const { statusCode, body } = await titleSlipValidate(digitableLine);

  return {
    statusCode,
    body,
  }

};
