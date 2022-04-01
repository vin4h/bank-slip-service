export const barCodeIsNumberValidate = (barCode: number): boolean => {
  if(barCode.toString().length < 44) {
    return false;
  } else if(!isNaN(barCode)) {
    return false;
  } else {
    return true;
  }
}
