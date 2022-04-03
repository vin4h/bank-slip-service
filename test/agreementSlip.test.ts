import { bankSlipService } from "../index";

test("Test if digitable line does not have 47 or 48 digits", async () => {
  const digitableLineIncorrect = "8177000000010009365997024131079703900143370831";
  const response = await bankSlipService({
    httpMethod: "GET",
    pathParameters: {
      digitableLine: digitableLineIncorrect,
    },
  });

  expect(response).toEqual({
    statusCode: 400,
    body: JSON.stringify({
      message: "Digitable line must have 47 or 48 characters"
    })
  })
})

test("Test if there are letters in the digitable line", async () => {
  const digitableLineWithLetter = "8177000000010009365w9702411310797039001433708318";
  const response = await bankSlipService({
    httpMethod: "GET",
    pathParameters: {
      digitableLine: digitableLineWithLetter,
    },
  });

  expect(response).toEqual({
    statusCode: 400,
    body: JSON.stringify({
      message: "Digitable line must be a number"
    })
  })
})

test("Test if digits validate is not correct after calc", async () => {
  const digitableLineDigitValidateError = "817900000001000936599702411310797039001433708318";
  const response = await bankSlipService({
    httpMethod: "GET",
    pathParameters: {
      digitableLine: digitableLineDigitValidateError,
    },
  });

  expect(response).toEqual({
    statusCode: 400,
    body: JSON.stringify({
      message: "Validate digit in digitable line is not valid"
    })
  })
})

test("Test to return data from digitable line", async () => {
  const digitableLineCorrect = "817700000001000936599702411310797039001433708318";
  const response = await bankSlipService({
    httpMethod: "GET",
    pathParameters: {
      digitableLine: digitableLineCorrect,
    },
  });

  expect(response).toEqual({
    statusCode: 200,
    body: JSON.stringify({
        "barCode": "81700000001000936599702411310797039001433707000000010009365997024113107970390014",
        "amount": "10.00",
        "expirationDate": "2411-31-07"
    })
  })
})
