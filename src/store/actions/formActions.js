import * as Actions from './formActionTypes';

export const updateFormData = (name, value) => ({
  type: Actions.UPDATE_DATA,
  payload: { name, value },
});

// export const updateStatus = (showStatus, message) => ({
//   type: Actions.UPDATE_STATUS,
//   payload: { showStatus, message },
// });

export const disableSubmit = (disabled) => ({
  type: Actions.DISABLE_SUBMISSION,
  disabled,
});

export const updateErrors = (errors, name) => ({
  type: Actions.UPDATE_ERRORS,
  payload: { errors, name },
});

export const resetErrors = (name) => ({
  type: Actions.RESET_ERRORS,
  name,
});

export const resetForm = () => ({
  type: Actions.RESET_FORM,
});
