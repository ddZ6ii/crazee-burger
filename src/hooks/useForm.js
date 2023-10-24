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

  const validateInput = useCallback(
    (name, value) => {
      // clear previous error
      resetErrors(name);

      const validators = form.validators[name];

      if (isEmpty(validators)) {
        if (!hasError()) disableSubmit(false);
        return true;
      }

      // verify form input field for each related validator function
      const messages = validators.reduce((result, validator) => {
        const error = validator(value);
        return error.length ? [...result, error] : [...result];
      }, []);

      if (isEmpty(messages)) {
        disableSubmit(false);
        return true;
      }

      // update form errors
      updateErrors(messages, name);

      // disable form submission
      disableSubmit(true);

      return false;
    },
    [form.validators, resetErrors, disableSubmit, hasError, updateErrors]
  );

  const validateForm = useCallback(() => {
    // reset previous form errors
    resetErrors();

    const { data, validators } = form;

    if (isEmpty(validators)) return true;

    // verify each form input field with related validator function
    const formErrors = Object.entries(validators).reduce(
      (errors, [name, validators]) => {
        const messages = validators.reduce((result, validator) => {
          const error = validator(data[name], data);
          return error.length ? [...result, error] : [...result];
        }, []);
        if (messages.length > 0) errors[name] = messages;
        return errors;
      },
      {}
    );

    if (isEmpty(formErrors)) return true;

    // update form errors
    updateErrors(formErrors);

    return false;
  }, [form, resetErrors, updateErrors]);

  return {
    form,
    updateFormData,
    hasError,
    disableSubmit,
    resetForm,
    validateInput,
    validateForm,
  };
};

// custom hook to be used by context consumers
export const useForm = () => useContext(FormContext);
