import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { FaHamburger } from 'react-icons/fa';
import { MdOutlineEuroSymbol } from 'react-icons/md';
import { BsFillCameraFill } from 'react-icons/bs';

import EditFormInput from './EditFormInput';
import ProductPreview from './ProductPreview';

import { useProducts } from '../../../../hooks/useProducts';
import { isEmpty } from '../../../../utilities/checks';
import { theme } from '../../../../themes';

import {
  formInputs as inputs,
  formStatus as STATUS,
  productAddDefault as DEFAULT_SETTINGS,
} from './helpers/formSettings';

const initForm = (productInfo) => {
  const initialData = !isEmpty(productInfo)
    ? { ...productInfo }
    : inputs.reduce((acc, input) => ({ ...acc, [input.data.label]: '' }), {});
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
    status: STATUS.typing,
  };
};

export default function EditProductForm({ initialProduct, selectedProductId }) {
  const [form, setForm] = useState(() => initForm(initialProduct));
  const inputRef = useRef(null);
  const { editProduct } = useProducts();

  const hasError = (name) => {
    // if no input name parameter is provided, check for any form error
    if (isEmpty(name))
      return Object.entries(form.errors).some(([, errors]) => !isEmpty(errors));
    // otherwise, check for error only for the provided input
    return !isEmpty(form.errors[name]);
  };

  const resetFormErrors = (name) => {
    // if no input parameter is provided, reset all form errors
    // otherwise, reset errors only for the provided input
    isEmpty(name)
      ? setForm((prevForm) => ({ ...prevForm, errors: {} }))
      : setForm((prevForm) => ({
          ...prevForm,
          errors: { ...prevForm.errors, [name]: [] },
        }));
  };

  const updateFormErrors = (errors, name) => {
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
  };

  const validateInput = (name, value) => {
    // Clear previous input error (if any)
    resetFormErrors(name);

    // Extract input validator
    const validators = form.validators[name];

    // Return if input has no validator...
    if (isEmpty(validators)) return;

    // ...otherwise apply each validator to input and update related error
    const messages = validators.reduce((result, validator) => {
      const error = validator(value);
      return error.length ? [...result, error] : [...result];
    }, []);

    updateFormErrors(messages, name);
  };

  const isUrlValid = !hasError('imageSource');
  const hasUrl = !isEmpty(form.data.imageSource);
  const isDefaultUrl =
    form.data['imageSource'] === DEFAULT_SETTINGS.imageSource;

  const handleChange = (e) => {
    const { name, value } = e.target;
    validateInput(name, value);
    setForm((prevForm) => ({
      ...prevForm,
      data: { ...prevForm.data, [name]: value },
    }));
    editProduct(selectedProductId, name, value);
  };

  useEffect(() => inputRef.current.focus(), []);

  return (
    <FormStyled>
      <ProductPreview
        imageUrl={form.data.imageSource}
        showPreview={hasUrl && isUrlValid}
        className="form__preview"
      />

      <EditFormInput
        ref={inputRef}
        label="title"
        placeholder='Product name (e.g. "Super Burger")'
        icon={<FaHamburger className="input__icon" />}
        hasError={hasError}
        value={form.data['title']}
        className="form__input"
        handleChange={handleChange}
        errorMessage={form.errors['title'][0]}
      />

      <EditFormInput
        label="imageSource"
        placeholder="URL for product thumbnail (can be empty)"
        icon={<BsFillCameraFill className="input__icon" />}
        hasError={hasError}
        value={isDefaultUrl ? '' : form.data['imageSource']}
        className="form__input"
        handleChange={handleChange}
        errorMessage={form.errors['imageSource'][0]}
      />

      <EditFormInput
        type="number"
        label="price"
        placeholder="price"
        icon={<MdOutlineEuroSymbol className="input__icon" />}
        hasError={hasError}
        value={form.data['price']}
        className="form__input"
        handleChange={handleChange}
        errorMessage={form.errors['price'][0]}
      />

      <p className="form__info">
        Click a product to start <i>live</i> editing
      </p>
    </FormStyled>
  );
}

/* __________________________________________________________________________ *\
 ** Style
/* __________________________________________________________________________ */
const { breakpoints, colors, spacing } = theme;

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
  .form__info {
    color: ${colors.accent};
    grid-column: 2 / -1;
  }
`;
