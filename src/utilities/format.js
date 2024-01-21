/** Capitalize word */
export const capitalizeWord = (word) =>
  word.charAt(0).toUpperCase() + word.slice(1);

/** Capitalize string */
export const capitalizeString = (str = '') => {
  if (typeof str !== 'string') throw Error('Input must be a string');
  return str.split(' ').map(capitalizeWord).join(' ');
};
