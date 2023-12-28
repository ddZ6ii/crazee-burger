import styled from 'styled-components';

import { useProducts } from '../../../../hooks/useProducts';
import { useProductForm } from '../../../../hooks/useProductForm';

import AddFormInput from './AddFormInput';
import Button from '../../../common/Button';
import ProductPreview from './ProductPreview';

import {
  formInputs as inputs,
  formStatus as STATUS,
  formNotifications as NOTIFICATIONS,
  productAddDefault as DEFAULT_SETTINGS,
} from './helpers/formSettings';
import {
  displayToastNotification,
  TOAST_SUCCESS_SETTINGS,
  TOAST_ERROR_SETTINGS,
} from '../../../../utilities/notifications';
import { theme } from '../../../../themes';
import { isEmpty } from '../../../../utilities/checks';
import Loader from '../../../common/Loader';

export default function ProductForm() {
  const { addProduct } = useProducts();
  const {
    form,
    hasError,
    updateFormData,
    updateFormErrors,
    updateFormStatus,
    resetForm,
    resetFormErrors,
  } = useProductForm();

  const isUrlValid = !hasError('imageSource');
  const hasUrl = !isEmpty(form.data.imageSource);
  const isSubmitting = form.status === STATUS.submitting;
  const isSubmitDisabled = isSubmitting || hasError();
  const isResetDisabled = isSubmitting;

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

  const submitProduct = (product, delay = 0, shouldSucceed = true) => {
    // Pretend its hitting the network
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (shouldSucceed) {
          addProduct(product);
          resolve(true);
        } else {
          reject('Product could not be added');
        }
      }, delay);
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    validateInput(name, value);
    updateFormData(name, value);
  };

  const handleSubmit = async (e) => {
    let hasSucceeded = false;
    e.preventDefault();
    try {
      // Update form status to disable submission
      updateFormStatus(STATUS.submitting);

      // Add new product to existing list
      hasSucceeded = await submitProduct({
        ...DEFAULT_SETTINGS,
        ...form.data,
        imageSource: form.data.imageSource || DEFAULT_SETTINGS.imageSource,
      });

      // Clear form
      resetForm();
    } catch (err) {
      console.error(err);
    } finally {
      // Update form status to re-enable submission
      updateFormStatus(STATUS.typing);

      // Notify user
      const message = hasSucceeded
        ? [NOTIFICATIONS.submitSuccess, TOAST_SUCCESS_SETTINGS]
        : [NOTIFICATIONS.submitError, TOAST_ERROR_SETTINGS];
      displayToastNotification(...message);
    }
  };

  return (
    <FormStyled onSubmit={handleSubmit}>
      <ProductPreview
        imageUrl={form.data.imageSource}
        showPreview={hasUrl && isUrlValid}
        className="form__preview"
      />

      {inputs.map((input) => (
        <AddFormInput
          key={input.data.id}
          form={form}
          inputData={input.data}
          className="form__input"
          handleChange={handleChange}
        />
      ))}

      <div className="form__buttons">
        <Button
          type="submit"
          label={isSubmitting ? 'Submitting...' : 'Add Product'}
          Icon={
            isSubmitting && (
              <Loader className="loader" version="accentOnWhite" size="sm" />
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
          disabled={isResetDisabled}
          onClick={() => resetForm()}
        />
      </div>
    </FormStyled>
  );
}

/* __________________________________________________________________________ *\
 ** Style
/* __________________________________________________________________________ */
const { breakpoints, colors, fonts, spacing } = theme;

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

  .loader {
    & .spinningLoader {
      height: ${fonts.size.sm};
      width: ${fonts.size.sm};
      /* border-color: ${colors.white}; */
      /* border-top-color: ${colors.accent}; */
    }
  }
`;
