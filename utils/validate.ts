export const barCodeIsNumberValidate = (barCode: number): boolean => {
  console.log(isNaN(barCode))
  if(barCode.toString().length < 44) {
    return false;
  } else if(isNaN(barCode)) {
    return false;
  } else {
    return true;
  }
}

export const currencyCode = (currency: number): boolean => {
  if (currency.toString()[3] === '9') {
    return true;
  } else {
    return false;
  }
}
