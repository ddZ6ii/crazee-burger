import styled from 'styled-components';

import { useProducts } from '../../../../hooks/useProducts';
import { useForm } from '../../../../hooks/useForm';

import AddFormInput from './AddFormInput';
import Button from '../../../common/Button';
import ProductPreview from './ProductPreview';

import { formInputs as inputs } from './helpers/formInputs';
import {
  displayToastNotification,
  TOAST_SUCCESS_SETTINGS,
} from '../../../../utilities/notifications';
import { isEmpty } from '../../../../utilities/checks';
import { theme } from '../../../../themes';

const PRODUCT_DEFAULT_SETTINGS = {
  quantity: 0,
  isAvailable: true,
  isPromoted: false,
};
const DEFAULT_PRODUCT_URL = '/assets/images/menus/coming-soon.png';
const SUCCESS_SUBMIT_MESSAGE = 'Product added!';

export default function ProductForm() {
  const { addProduct } = useProducts();
  const {
    form,
    updateFormData,
    disableSubmit,
    updateErrors,
    resetErrors,
    resetForm,
    hasError,
  } = useForm();

  const validateInput = (name, value) => {
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
  };

  const validateForm = () => {
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
  };

  const handleBlur = (e) => validateInput(e.target.name, e.target.value);

  const handleChange = (e) => {
    const { name, value } = e.target;
    validateInput(name, value);
    updateFormData(name, value);
  };

  const handleSumbit = async (e) => {
    e.preventDefault();

    // lock form during submission
    disableSubmit(true);

    // data validation
    const isFormValid = validateForm();
    if (isFormValid) {
      // add new product to menu list
      addProduct({
        ...PRODUCT_DEFAULT_SETTINGS,
        ...form.data,
        imageSource: form.data.imageSource || DEFAULT_PRODUCT_URL,
      });
      // confirm submission
      displayToastNotification(SUCCESS_SUBMIT_MESSAGE, TOAST_SUCCESS_SETTINGS);

      // clear form
      resetForm();
    }

    // unlock form
    disableSubmit(false);
  };

  return (
    <FormStyled onSubmit={handleSumbit}>
      <ProductPreview className="form__preview" />

      {inputs.map((input) => (
        <AddFormInput
          key={input.data.id}
          form={form}
          inputData={input.data}
          className="form__input"
          handleBlur={handleBlur}
          handleChange={handleChange}
        />
      ))}

      <div className="form__buttons">
        <Button
          type="submit"
          label="Add Product"
          className="form__btn"
          version="success"
          disabled={form.submission.isDisabled}
        />
        <Button
          label="Reset"
          className="form__btn"
          version="info"
          disabled={form.submission.isDisabled && !hasError()}
          onClick={() => resetForm()}
        />
      </div>
    </FormStyled>
  );
}

/* __________________________________________________________________________ *\
 ** Style
/* __________________________________________________________________________ */
const { breakpoints, spacing } = theme;

const FormStyled = styled.form`
  display: grid;
  grid-template-columns: auto repeat(3, 1fr);
  grid-template-rows: repeat(4, auto);
  column-gap: ${spacing.md};
  row-gap: ${spacing['2xs']};

  @media screen and (min-width: ${breakpoints.xl}) {
    column-gap: ${spacing['2xl']};
  }

  .form__preview {
    grid-area: 1 / 1 / span 3 / span 1;
  }

  .form__input {
    max-width: 650px;
    grid-column: 2 / -1;
  }

  .form__buttons {
    max-width: 650px;
    grid-area: 4 / 2 / span 1 / -1;
    display: flex;
    gap: ${spacing['2xs']};
  }

  .form__btn {
    padding: ${spacing.xs} ${spacing.md};
    font-size: inherit;
  }
`;
