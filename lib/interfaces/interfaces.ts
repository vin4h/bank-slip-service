export interface IFieldsToCalculate {
  firstFieldCalculate: string;
  secondFieldCalculate: string;
  thirdFieldCalculate: string;
}

export interface ISumFields {
  sumFirstField: number;
  sumSecondField: number;
  sumThirdField: number;
}

export interface IConvertInBarCode {
  barCode: string;
  partialsBarCode: {
    firstSection: string;
    secondSection: string;
    thirdSection: string;
    fourthSection: string;
    fifthSection: string;
    sixthSection: string;
  }
}

export interface IResponseStructure {
  statusCode: number;
  body: string;
}
