import * as Actions from './actions/productFormActionTypes';
import {
  formInputs as INPUTS,
  formStatus as STATUS,
} from '../components/pages/order/admin/tabs/form/constants/formSettings';
import { PRODUCT as PRODUCT_DEFAULT } from '../enums/product';

import { getInputErrors, isEmpty } from '../utilities/checks';
import { deepClone } from '../utilities/deepClone';

const initFormData = (productData) =>
  Object.keys(INPUTS).reduce((acc, key) => {
    const inputValue = isEmpty(productData)
      ? PRODUCT_DEFAULT[key]
      : productData[key];
    return { ...acc, [key]: inputValue };
  }, {});

const initFormErrors = (productData) => {
  return Object.keys(INPUTS).reduce((acc, key) => {
    const inputErrors = isEmpty(productData)
      ? []
      : getInputErrors(INPUTS[key].validators, productData[key]);
    return { ...acc, [key]: inputErrors };
  }, {});
};

const initialFormStatus = STATUS.typing;

export const initForm = (productData) => {
  return {
    data: initFormData(productData),
    errors: initFormErrors(productData),
    status: initialFormStatus,
  };
};

export const productFormReducer = (form, action) => {
  switch (action.type) {
    case Actions.UPDATE_DATA: {
      return {
        ...deepClone(form),
        data: { ...deepClone(form.data), [action.name]: action.value },
      };
    }
    case Actions.UPDATE_ERROR: {
      return {
        ...deepClone(form),
        errors: { ...deepClone(form.errors), [action.name]: action.errors },
      };
    }
    case Actions.UPDATE_STATUS: {
      return {
        ...deepClone(form),
        status: action.status,
      };
    }
    case Actions.RESET_ERROR: {
      return {
        ...deepClone(form),
        errors: { ...deepClone(form.errors), [action.name]: [] },
      };
    }
    case Actions.RESET_FORM: {
      return { ...deepClone(form), ...initForm(action.productData) };
    }
    default: {
      throw new Error(`Unknown action: ${action.type}`);
    }
  }
};
