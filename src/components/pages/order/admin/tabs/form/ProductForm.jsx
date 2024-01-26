import { forwardRef } from 'react';
import styled from 'styled-components';

import FormInput from './FormInput';
import ProductPreview from './ProductPreview';
import {
  formInputs as INPUTS,
  formStatus as STATUS,
} from './constants/formSettings';
import { PRODUCT as PRODUCT_DEFAULT } from '../../../../../../enums/product';
import * as Actions from '../../../../../../reducers/actions/productFormActionTypes';
import { theme } from '../../../../../../themes/index';
import {
  getInputErrors,
  hasErrors,
  isEmpty,
} from '../../../../../../utilities/checks';

const ProductForm = forwardRef(function ProductForm(
  {
    form,
    dispatch,
    isSubmitting = false,
    children,
    onEdit = () => {},
    onSubmit = () => {},
  },
  ref
) {
  const validateInput = (name, value) => {
    // Clear previous input error (if any)
    dispatch({ type: Actions.RESET_ERROR, name });
    // Extract related input validator(s)
    const inputValidators = INPUTS[name].validators;
    // Apply each validator to input to compute error message(s) (if any)
    const errors = getInputErrors(inputValidators, value);
    // Update form state
    dispatch({ type: Actions.UPDATE_ERROR, name, errors });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Update form status
    if (!isTyping)
      dispatch({ type: Actions.UPDATE_STATUS, status: STATUS.typing });
    // Verify input
    validateInput(name, value);
    // Update local state with input value
    dispatch({ type: Actions.UPDATE_DATA, name, value });
    // Update parent state
    onEdit(name, value);
  };

  const isDefaultUrl = form.data.imageSource === PRODUCT_DEFAULT.imageSource;
  const isTyping = form.status === STATUS.typing;
  const isUrlValid = !hasErrors(form.errors.imageSource);
  const hasUrl = !isEmpty(form.data.imageSource);
  const showPreview = hasUrl && isUrlValid && !isDefaultUrl;

  return (
    <FormStyled onSubmit={onSubmit}>
      <ProductPreview
        imageUrl={form.data.imageSource}
        showPreview={showPreview}
        className="form__preview"
      />

      {Object.entries(INPUTS).map(([key, { inputProps, Icon }], index) => (
        <FormInput
          key={key}
          ref={index === 0 ? ref : null}
          value={form.data[key]}
          errors={form.errors[key]}
          inputProps={inputProps}
          Icon={Icon}
          disabled={isSubmitting}
          autoFocus={index === 0}
          onChange={handleChange}
        />
      ))}

      {children}
    </FormStyled>
  );
});

export default ProductForm;

/* __________________________________________________________________________ *\
 ** Style
/* __________________________________________________________________________ */
const { breakpoints, spacing } = theme;

const FormStyled = styled.form`
  width: 100%;
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
`;
