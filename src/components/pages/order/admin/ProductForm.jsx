import styled from 'styled-components';
// import { AiOutlineCheckCircle } from 'react-icons/ai';
import { BiError } from 'react-icons/bi';

import { useProducts } from '../../../../hooks/useProducts';
import { useForm } from '../../../../hooks/useForm';

import ProductPreview from './ProductPreview';
import Input from '../../../common/Input';
import Button from '../../../common/Button';

import { formInputs as inputs } from './helpers/formInputs';
import { classNames } from '../../../../utilities/classNames';
// import { delay } from '../../../../utilities/temporization';
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

// !TO DO: replace message with toast notification? (idem on delete product...)

export default function ProductForm() {
  const { addProduct } = useProducts();
  const {
    form,
    updateFormData,
    // updateStatus,
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

  // const showStatus = async (duration, message) => {
  //   updateStatus(true, message);
  //   await delay(duration);
  //   updateStatus(false, '');
  // };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    validateInput(name, value);
  };

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
        imageSource:
          form.data.imageSource || '/assets/images/menus/coming-soon.png',
      });
      // confirm submission
      // await showStatus(1500, 'Product added!');
      displayToastNotification(`Product added!`, TOAST_SUCCESS_SETTINGS);

      // clear form
      resetForm();
    }

    // unlock form
    disableSubmit(false);
  };

  return (
    <ContainerStyled>
      <ProductPreview />

      <form className="form" onSubmit={handleSumbit}>
        {inputs.map(
          ({
            id,
            type,
            label,
            placeholder,
            isRequired,
            icon,
            klass,
            ...rest
          }) => (
            <div key={id}>
              <Input
                type={type}
                label={label}
                placeholder={placeholder}
                isRequired={isRequired}
                Icon={icon}
                className={classNames(klass, hasError(label) && 'has-error')}
                value={form.data[label] ?? ''}
                onBlur={handleBlur}
                onChange={handleChange}
                {...rest}
              />
              {hasError(label) && (
                <p key={id} className="form__errorMessage">
                  <BiError /> {form.errors[label][0]}
                </p>
              )}
            </div>
          )
        )}
        <div className="form__container">
          <div className="form__buttons">
            <Button
              type="submit"
              label="Add Product"
              className="form__btn"
              disabled={form.submission.isDisabled}
            />
            <Button
              label="Reset"
              className="form__btn"
              disabled={form.submission.isDisabled && !hasError()}
              onClick={() => resetForm()}
            />
          </div>
          {/* {form.submission.showStatus && (
            <p className="form__status">
              <AiOutlineCheckCircle /> {form.submission.status}
            </p>
          )} */}
        </div>
      </form>
    </ContainerStyled>
  );
}

/* __________________________________________________________________________ *\
 ** Style
/* __________________________________________________________________________ */
const { breakpoints, colors, fonts, spacing } = theme;

const ContainerStyled = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: ${spacing.sm};

  .form {
    max-width: 650px;
    display: flex;
    flex-direction: column;
    gap: ${spacing['2xs']};
  }

  .form__input {
    .container {
      padding: ${spacing.xs} ${spacing.md};
      background-color: ${colors.neutral_lightest};
      outline: 1px solid transparent;
    }

    &:not(.has-error) .container {
      &:has(input:focus) {
        outline-color: ${colors.neutral};
      }
    }

    & .input {
      color: ${colors.neutral_darkest};
      &::placeholder {
        color: ${colors.neutral};
      }
      /* remove native up & down arrows for input with number type */
      &[type='number'] {
        /* Firefox */
        --moz-appearance: textfield;
        /* Chrome, Safari, Edge, Opera */
        &::-webkit-outer-spin-button,
        &::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
      }
    }
  }

  .form__errorMessage {
    margin-top: ${spacing['3xs']};
    display: flex;
    align-items: center;
    gap: ${spacing['4xs']};
    color: ${colors.info_danger};
    font-size: ${fonts.size.xs};
  }

  .form__container {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .form__buttons {
    display: flex;
    gap: ${spacing.xs};
  }

  .form__btn {
    padding: ${spacing.xs} ${spacing.md};
    width: fit-content;
    border: 1px solid transparent;
    font-weight: ${fonts.weight.bold};
    outline: none;
  }

  .form__btn[type='submit'] {
    background-color: ${colors.info_success};
    &:focus,
    &:not(:disabled):hover {
      color: ${colors.info_success};
      background-color: ${colors.white};
      border-color: ${colors.info_success};
    }
    &:active {
      background-color: ${colors.info_success};
    }
    &:disabled {
      cursor: default;
      background-color: ${colors.neutral_light};
    }
  }

  .form__btn[type='button'] {
    background-color: ${colors.neutral};
    color: ${colors.neutral_lightest};

    &:not(:disabled):hover,
    &:focus {
      color: ${colors.neutral};
      background-color: ${colors.white};
      border-color: ${colors.neutral};
    }
    &:active {
      background-color: ${colors.neutral};
      color: ${colors.neutral_lightest};
    }
    &:disabled {
      cursor: default;
      background-color: ${colors.neutral_light};
    }
  }

  .form__status {
    display: flex;
    align-items: center;
    gap: ${spacing['2xs']};
    color: ${colors.info_success};
  }

  .has-error {
    &.form__input .container {
      outline-color: ${colors.info_danger};
    }
  }

  @media screen and (min-width: ${breakpoints.xl}) {
    gap: ${spacing['2xl']};
  }
`;
