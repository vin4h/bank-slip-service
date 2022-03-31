import { barCodeIsNumberValidate } from './utils/validate'
type barCode = number;
export const bankSlipService = async (event: any) => {
  if (event.http.method != 'GET') {
    return {
      statusCode: 405,
      body: JSON.stringify({
        message: 'Method not allowed',
      }),
    }
  }
  const barCode: barCode = event.pathParameters.barCode;

  if(barCodeIsNumberValidate(barCode)) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: 'BarCode must be a number or contains 44 numbers',
      }),
    }
  }
};
