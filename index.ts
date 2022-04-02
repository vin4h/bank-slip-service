import { barCodeIsNumberValidate, currencyCode, validateDV, convertDigitableLineInBarCode } from './lib/validate';
import { bankCodeApi } from './lib/bankApi';

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

  if(!barCodeIsNumberValidate(digitableLine)) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: 'BarCode must be a number or contains 47 numbers',
      }),
    }
  }

  if(!currencyCode(digitableLine)) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: 'Currency code is not BRL',
      }),
    }
  }

  const isValidBankCode = await bankCodeApi(digitableLine);

  if (!isValidBankCode) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: 'Bank code is not valid',
      }),
    }
  }
  const barCode = convertDigitableLineInBarCode(digitableLine);
  const dv = validateDV(barCode);

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: barCode
    }),
  }
};
