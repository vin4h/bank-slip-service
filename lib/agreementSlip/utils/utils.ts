/**
 * @description Get and format value recived from digitable line
 * @param {string} value - The value in digitable line
 * @returns {string} - Return the sum
 */
 export const amountInDigitableLine = (value: string): string => {
  const lastDigits = value.split('').join('').slice(5, 13);
  const decimal = value.slice(13,15);
  const amount = parseFloat(lastDigits).toFixed(0).concat("." + decimal);
  return amount;
}

/**
 * @description Get expiration date from digitable line
 * @param digitableLine - The digitable line recived from request
 * @returns  {string} - Return the expiration date
 */
export const getExpirationDate = (digitableLine: string): string => {
  const positionDate = digitableLine.slice(23, 31);

  const year = positionDate.split('').slice(0, 4).join('');
  const month = positionDate.split('').slice(4, 6).join('');
  const day = positionDate.split('').slice(6, 8).join('');

  return `${year}-${month}-${day}`;
}
