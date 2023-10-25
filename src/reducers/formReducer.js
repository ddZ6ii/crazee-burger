import * as Actions from './actions/formActionTypes';
import { formInputs as inputs } from '../components/pages/order/admin/helpers/formInputs';
import { isEmpty } from '../utilities/checks';

export const initForm = () => {
  const initialData = inputs.reduce(
    (acc, input) => ({ ...acc, [input.data.label]: '' }),
    {}
  );
  const initialValidators = inputs.reduce(
    (acc, input) => ({ ...acc, [input.data.label]: input.validators }),
    {}
  );
  const initialErrors = inputs.reduce(
    (acc, input) => ({ ...acc, [input.data.label]: [] }),
    {}
  );
  return {
    data: { ...initialData },
    validators: { ...initialValidators },
    errors: { ...initialErrors },
    submission: { isDisabled: false },
  };
};

export const formReducer = (form = initForm(), action) => {
  switch (action.type) {
    case Actions.UPDATE_DATA: {
      return {
        ...form,
        data: { ...form.data, [action.payload.name]: action.payload.value },
      };
    }
    case Actions.DISABLE_SUBMISSION: {
      return {
        ...form,
        submission: { ...form.submission, isDisabled: action.disabled },
      };
    }
    case Actions.UPDATE_ERRORS: {
      // if no input parameter is provided, update all form errors
      // otherwise, update errors only for the provided input
      if (isEmpty(action.payload.name))
        return {
          ...form,
          errors: action.payload.errors,
        };
      return {
        ...form,
        errors: {
          ...form.errors,
          [action.payload.name]: action.payload.errors,
        },
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
