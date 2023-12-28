import * as Actions from './formActionTypes';

export const initData = (payload) => ({
  type: Actions.INIT_DATA,
  payload,
});
export const updateData = (name, value) => ({
  type: Actions.UPDATE_DATA,
  payload: { name, value },
});

export const updateStatus = (status) => ({
  type: Actions.UPDATE_STATUS,
  status,
});

export const updateErrors = (errors, name) => ({
  type: Actions.UPDATE_ERRORS,
  errors,
  name,
});

export const updateMultiple = (payload) => ({
  type: Actions.UPDATE_MULTIPLE,
  payload,
});

export const resetErrors = (name) => ({
  type: Actions.RESET_ERRORS,
  name,
});

export const resetForm = () => ({
  type: Actions.RESET_FORM,
});
