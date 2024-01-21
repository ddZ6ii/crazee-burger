import { useCallback, useState } from 'react';
import { getInputErrors, hasErrors, isEmpty } from '../utilities/checks';
import {
  formInputs as INPUTS,
  formStatus as STATUS,
} from '../components/pages/order/admin/helpers/formSettings';

const initForm = (initialProductInfo) => {
  const initialValidators = INPUTS.reduce(
    (acc, input) => ({ ...acc, [input.data.label]: input.validators }),
    {}
  );
  const initialErrors = isEmpty(initialProductInfo)
    ? INPUTS.reduce(
        (errors, input) => ({ ...errors, [input.data.label]: [] }),
        {}
      )
    : Object.entries(initialProductInfo).reduce(
        (errors, [inputName, inputValue]) => ({
          ...errors,
          [inputName]: getInputErrors(initialValidators[inputName], inputValue),
        }),
        {}
      );
  return {
    validators: { ...initialValidators },
    errors: { ...initialErrors },
    status: STATUS.typing,
  };
};

export const useForm = (product) => {
  const [form, setForm] = useState(() => initForm(product));

  const updateFormStatus = useCallback(
    (status) => setForm((prevForm) => ({ ...prevForm, status })),
    []
  );

  const updateFormErrors = useCallback((errors, name) => {
    // if no input parameter is provided, update all form errors
    // otherwise, update errors only for the provided input
    isEmpty(name)
      ? setForm((prevForm) => ({ ...prevForm, errors: errors }))
      : setForm((prevForm) => ({
          ...prevForm,
          errors: {
            ...prevForm.errors,
            [name]: errors,
          },
        }));
  }, []);

  const resetForm = useCallback(() => setForm(initForm), []);

  const resetFormErrors = useCallback((name) => {
    // If no name parameter is provided, reset all form errors...
    isEmpty(name)
      ? setForm((prevForm) => ({ ...prevForm, errors: {} }))
      : // ...otherwise reset errors only for the provided input
        setForm((prevForm) => ({
          ...prevForm,
          errors: { ...prevForm.errors, [name]: [] },
        }));
  }, []);

  const isUrlValid = !hasErrors(form.errors, INPUTS[1].data.label);
  const hasUrl = !isEmpty(product.imageSource);
  const showPreview = hasUrl && isUrlValid;
  const isSubmitting = form.status === STATUS.submitting;
  const isSubmitDisabled = isSubmitting || hasErrors(form.errors);

  return {
    form,
    updateFormStatus,
    updateFormErrors,
    resetForm,
    resetFormErrors,
    showPreview,
    isSubmitting,
    isSubmitDisabled,
  };
};
