import { createContext, useCallback, useReducer } from 'react';

import * as Actions from '../reducers/actions/formActions';
import { formReducer, initForm } from '../reducers/formReducer';
import { isEmpty } from '../utilities/checks';

export const ProductFormContext = createContext(null);

export const ProductFormProvider = ({ children }) => {
  const [form, dispatch] = useReducer(formReducer, {}, initForm);

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

  const initFormFata = useCallback(
    (payload) => dispatch(Actions.initData(payload)),
    []
  );

  const updateFormData = useCallback(
    (name, value) => dispatch(Actions.updateData(name, value)),
    []
  );

  const updateFormErrors = useCallback(
    (errors, name) => dispatch(Actions.updateErrors(errors, name)),
    []
  );

  const updateFormStatus = useCallback(
    (status) => dispatch(Actions.updateStatus(status)),
    []
  );

  const updateMultiple = useCallback(
    (payload) => dispatch(Actions.updateMultiple(payload)),
    []
  );

  const resetFormErrors = useCallback(
    (name) => dispatch(Actions.resetErrors(name)),
    []
  );

  const resetForm = useCallback(() => dispatch(Actions.resetForm()), []);

  const productInfo = {
    form,
    hasError,
    initFormFata,
    updateFormData,
    updateFormErrors,
    updateFormStatus,
    updateMultiple,
    resetForm,
    resetFormErrors,
  };

  return (
    <ProductFormContext.Provider value={productInfo}>
      {children}
    </ProductFormContext.Provider>
  );
};
