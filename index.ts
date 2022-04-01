import { barCodeIsNumberValidate, currencyCode } from './lib/validate';
import { bankCodeApi } from './lib/bankApi';

type barCode = number;
export const bankSlipService = async (event: any) => {
  if (event.httpMethod != 'GET') {
    return {
      statusCode: 405,
      body: JSON.stringify({
        message: 'Method not allowed',
      }),
    }
  }
  const barCode: barCode = event.pathParameters.barCode;
  if(!barCodeIsNumberValidate(barCode)) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: 'BarCode must be a number or contains 44 numbers',
      }),
    }
  }

  if(!currencyCode(barCode)) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: 'Currency code is not BRL',
      }),
    }
  }

  const isValidBankCode = await bankCodeApi(barCode);

  if (!isValidBankCode) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: 'Bank code is not valid',
      }),
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'BarCode is valid',
    }),
  }
};
