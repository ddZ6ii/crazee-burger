export function isEmpty(value) {
  if (value === null) return true;
  if (typeof value === 'undefined') return true;
  if (typeof value === 'string' && value.length === 0) return true;
  if (Array.isArray(value) && value.length === 0) return true;
  if (typeof value === 'object' && Object.keys(value).length === 0) return true;
  return false;
}

/** Retrieve input errors from given input value and related input validators */
export function getInputErrors(inputValidators, inputValue) {
  // Return if input has no validator...
  if (isEmpty(inputValidators)) return [];

  // ...otherwise apply each validator to input to retrieve related errors
  const messages = inputValidators.reduce((result, validator) => {
    const error = validator(inputValue);
    return error.length ? [...result, error] : [...result];
  }, []);

  return messages;
}

export function hasErrors(errors) {
  // If array only errors for a specific form input are provided...
  if (Array.isArray(errors)) return !isEmpty(errors);

  // ...otherwise check errors for all form inputs
  return Object.entries(errors).some(([, err]) => !isEmpty(err));
}
