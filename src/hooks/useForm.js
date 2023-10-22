import { useCallback, useContext, useReducer } from 'react';

import * as Actions from '../store/actions/formActions';
import { formReducer, initForm } from '../store/reducers/formReducer';
import { FormContext } from '../contexts/FormContext';
import { isEmpty } from '../utilities/checks';

// to be passed as the value for the context provider
export const useFormStore = () => {
  const [form, dispatch] = useReducer(formReducer, {}, initForm);

  const updateFormData = useCallback(
    (name, value) => dispatch(Actions.updateFormData(name, value)),
    []
  );

  const hasError = useCallback(
    (name) => {
      // if no input name parameter is provided, check for any form error
      if (isEmpty(name))
        return Object.entries(form.errors).some(
          ([, errors]) => !isEmpty(errors)
        );
      // otherwise, check for error only for the provided input
      return !isEmpty(form.errors[name]);
    },
    [form]
  );

  const disableSubmit = useCallback(
    (disabled) => dispatch(Actions.disableSubmit(disabled)),
    []
  );

  const updateErrors = useCallback(
    (errors, name) => dispatch(Actions.updateErrors(errors, name)),
    []
  );

  const resetErrors = useCallback(
    (name) => dispatch(Actions.resetErrors(name)),
    []
  );

  const resetForm = useCallback(() => dispatch(Actions.resetForm()), []);

  return {
    form,
    updateFormData,
    hasError,
    disableSubmit,
    updateErrors,
    resetErrors,
    resetForm,
  };
};

// custom hook to be used by context consumers
export const useForm = () => useContext(FormContext);
