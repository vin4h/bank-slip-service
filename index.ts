import { barCodeIsNumberValidate, currencyCode, validateDigitDigitableLine, convertDigitableLineInBarCode, amountInBarCode, getExpirationDate } from './lib/titleSlipValidate';
import { bankCodeApi } from './lib/bankApi';
import { IConvertInBarCode } from './lib/interfaces';

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
  if (digitableLine.toString().length == 47) {
    if (!barCodeIsNumberValidate(digitableLine)) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: 'Digitable line must be a number',
        }),
      }
    }

    if (!currencyCode(digitableLine)) {
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
    const dv = validateDigitDigitableLine(digitableLine);

    if (!dv) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: 'Validator digits on digital line are not valid',
        }),
      }
    }
    const { barCode, partialsBarCode }: IConvertInBarCode = convertDigitableLineInBarCode(digitableLine);

    const amount = amountInBarCode(partialsBarCode.sixthSection);

    const expirationDate = getExpirationDate(partialsBarCode.sixthSection);

    return {
      statusCode: 200,
      body: JSON.stringify({
        barCode,
        amount,
        expirationDate,
      }),
    }
  } else {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: 'Digitable not contains 47 numbers',
      }),
    }
  }

};
