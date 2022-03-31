export const barCodeIsNumberValidate = (barCode: number): boolean  => {
  if (barCode < 0) {
    return false;
  } else if(!isNaN(barCode)) {
    return false;
  } else if (barCode.toString().length < 44) {
    return false;
  }
  else {
    return true;
  }

}
