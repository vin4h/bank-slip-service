import { bankSlipService } from "../index";

test("Test if digitable line does not have 47 or 48 digits", async () => {
  const digitableLineIncorrect = "21290001192110001210904475617405975870000200";
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
  const digitableLineWithLetter = "2129000119211000121090447561740597587000000200w";
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
  const digitableLineDigitValidateError = "21290001132110001210904475617405975870000002000";
  const response = await bankSlipService({
    httpMethod: "GET",
    pathParameters: {
      digitableLine: digitableLineDigitValidateError,
    },
  });

  expect(response).toEqual({
    statusCode: 400,
    body: JSON.stringify({
      message: "Validator digits on digital line are not valid"
    })
  })
})

test("Test to return data from digitable line", async () => {
  const digitableLineCorrect = "21290001192110001210904475617405975870000002000";
  const response = await bankSlipService({
    httpMethod: "GET",
    pathParameters: {
      digitableLine: digitableLineCorrect,
    },
  });

  expect(response).toEqual({
    statusCode: 200,
    body: JSON.stringify({
        "barCode": "21299758700000020000001121100012100447561740",
        "amount": "20.00",
        "expirationDate": "2018-07-16"
    })
  })
})
