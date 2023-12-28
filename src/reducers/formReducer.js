import * as Actions from './actions/formActionTypes';
import {
  formInputs as INPUTS,
  formStatus as STATUS,
} from '../components/pages/order/admin/helpers/formSettings';
import { isEmpty } from '../utilities/checks';

export const initForm = () => {
  const initialData = INPUTS.reduce(
    (acc, input) => ({ ...acc, [input.data.label]: '' }),
    {}
  );
  const initialValidators = INPUTS.reduce(
    (acc, input) => ({ ...acc, [input.data.label]: input.validators }),
    {}
  );
  const initialErrors = INPUTS.reduce(
    (acc, input) => ({ ...acc, [input.data.label]: [] }),
    {}
  );
  return {
    data: { ...initialData },
    validators: { ...initialValidators },
    errors: { ...initialErrors },
    status: STATUS.typing,
  };
};

export const formReducer = (form = initForm(), action) => {
  switch (action.type) {
    case Actions.INIT_DATA: {
      return {
        ...form,
        data: { ...form.data, ...action.payload },
      };
    }
    case Actions.UPDATE_DATA: {
      return {
        ...form,
        data: { ...form.data, [action.payload.name]: action.payload.value },
      };
    }
    case Actions.UPDATE_STATUS: {
      return {
        ...form,
        status: action.status,
      };
    }
    case Actions.UPDATE_ERRORS: {
      // if no input parameter is provided, update all form errors
      // otherwise, update errors only for the provided input
      if (isEmpty(action.name))
        return {
          ...form,
          errors: action.errors,
        };
      return {
        ...form,
        errors: {
          ...form.errors,
          [action.name]: action.errors,
        },
      };
    }
    case Actions.UPDATE_MULTIPLE: {
      return {
        ...form,
        ...action.payload,
      };
    }
    case Actions.RESET_ERRORS: {
      // if no input parameter is provided, reset all form errors
      // otherwise, reset errors only for the provided input
      if (isEmpty(action.name)) return { ...form, errors: {} };
      return { ...form, errors: { ...form.errors, [action.name]: [] } };
    }
    case Actions.RESET_FORM: {
      return initForm();
    }
    default: {
      throw new Error(`Unknown action: ${action.type}`);
    }
  }
};
