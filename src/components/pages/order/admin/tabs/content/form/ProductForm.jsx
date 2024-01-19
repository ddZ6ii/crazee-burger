import { useEffect, useReducer, useRef } from 'react';
import styled from 'styled-components';

import Button from '../../../../../../common/Button';
import FormInput from './FormInput';
import Loader from '../../../../../../common/Loader';
import ProductPreview from './ProductPreview';
import { PRODUCT as PRODUCT_DEFAULT } from '../../../../../../../enums/product';
import {
  formInputs as INPUTS,
  formStatus as STATUS,
  formNotifications as NOTIFICATIONS,
} from '../../../helpers/formSettings';
import { useProducts } from '../../../../../../../hooks/useProducts';
import * as Actions from '../../../../../../../reducers/actions/productFormActionTypes';
import {
  initForm,
  productFormReducer,
} from '../../../../../../../reducers/productFormReducer';
import { theme } from '../../../../../../../themes';
import {
  getInputErrors,
  hasErrors,
  isEmpty,
} from '../../../../../../../utilities/checks';
import { capitalizeString } from '../../../../../../../utilities/format';
import {
  notifySuccess,
  notifyError,
} from '../../../../../../../utilities/notifications';

export default function ProductForm({
  initialProduct,
  isEditing = false,
  children,
  onEdit = () => {},
  onSubmit = () => {},
  onReset = () => {},
}) {
  const inputRef = useRef(null);
  const [form, dispatch] = useReducer(productFormReducer, {}, () =>
    initForm(initialProduct)
  );
  const { products } = useProducts();

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

  const handleSubmit = async (e) => {
    let hasSucceeded = false;
    const productInfo = {
      ...PRODUCT_DEFAULT,
      title: capitalizeString(form.data.title),
      imageSource: form.data.imageSource || PRODUCT_DEFAULT.imageSource,
      price: form.data.price,
    };
    try {
      e.preventDefault();
      // Update form status to disable submission
      dispatch({ type: Actions.UPDATE_STATUS, status: STATUS.submitting });
      // Execute parent's onSubmit event handler
      hasSucceeded = await onSubmit(productInfo);
      // Reset form input fields
      dispatch({ type: Actions.RESET_FORM });
    } catch (err) {
      console.error(err);
    } finally {
      // Update form status to re-enable submission
      dispatch({ type: Actions.UPDATE_STATUS, status: STATUS.submitted });
      // Notify user
      const productTitle = productInfo.title || 'Product';
      hasSucceeded
        ? notifySuccess(`${productTitle} added!`)
        : notifyError(NOTIFICATIONS.submitError);
    }
  };

  const handleReset = () => {
    dispatch({ type: Actions.RESET_FORM });
    onReset();
    inputRef.current.focus();
  };

  const isDefaultUrl = form.data.imageSource === PRODUCT_DEFAULT.imageSource;
  const isSubmitting = form.status === STATUS.submitting;
  const isSubmitDisabled = isSubmitting || hasErrors(form.errors);
  const isTyping = form.status === STATUS.typing;
  const isUrlValid = !hasErrors(form.errors.imageSource);
  const hasUrl = !isEmpty(form.data.imageSource);
  const showPreview = hasUrl && isUrlValid && !isDefaultUrl;

  // Focus product name form's input on mounting and after product addition or deletion
  useEffect(() => {
    inputRef.current.focus();
  }, [products.length]);

  return (
    <FormStyled onSubmit={handleSubmit}>
      <ProductPreview
        imageUrl={form.data.imageSource}
        showPreview={showPreview}
        className="form__preview"
      />

      {Object.entries(INPUTS).map(([key, { inputProps, Icon }], index) => (
        <FormInput
          key={key}
          ref={index === 0 ? inputRef : null}
          value={form.data[key]}
          errors={form.errors[key]}
          inputProps={inputProps}
          Icon={Icon}
          disabled={isSubmitting}
          onChange={handleChange}
        />
      ))}

      {children}

      {!isEditing && (
        <div className="form__buttons">
          <Button
            type="submit"
            label={isSubmitting ? 'Submitting...' : 'Add Product'}
            Icon={
              isSubmitting && (
                <Loader
                  className="form__loader"
                  version="accentOnWhite"
                  size="sm"
                />
              )
            }
            className="form__btn"
            version="success"
            disabled={isSubmitDisabled}
          />
          <Button
            label="Reset"
            className="form__btn"
            version="info"
            disabled={isSubmitting}
            onClick={handleReset}
          />
        </div>
      )}
    </FormStyled>
  );
}

/* __________________________________________________________________________ *\
 ** Style
/* __________________________________________________________________________ */
const { breakpoints, fonts, spacing } = theme;

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

  .form__loader {
    & .spinningLoader {
      height: ${fonts.size.sm};
      width: ${fonts.size.sm};
    }
  }
`;
