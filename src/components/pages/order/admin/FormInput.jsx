import { forwardRef } from 'react';
import styled from 'styled-components';
import { BiError } from 'react-icons/bi';

import Input from '../../../common/Input';
import { PRODUCT as PRODUCT_DEFAULT } from '../../../../enums/product';
import { isEmpty } from '../../../../utilities/checks';
import { classNames } from '../../../../utilities/classNames';
import { theme } from '../../../../themes';

const FormInput = forwardRef(function FormInput(
  {
    value,
    errors,
    inputProps,
    Icon,
    onChange,
    // Additionnal attributes passed fron the parent
    ...restProps
  },
  ref
) {
  const hasError = !isEmpty(errors);
  const isDefaultUrl = value === PRODUCT_DEFAULT.imageSource;
  const isUrl = inputProps.label === 'imageSource';
  const inputClassName = classNames(
    inputProps.className,
    hasError && 'has-error'
  );

  return (
    <ContainerStyled>
      <Input
        {...inputProps}
        ref={ref && ref}
        Icon={Icon}
        onChange={onChange}
        className={inputClassName}
        value={isUrl && isDefaultUrl ? '' : value}
        {...restProps}
      />
      {hasError && (
        <p key={inputProps.label} className="input__errorMessage">
          <BiError /> {errors[0]}
        </p>
      )}
    </ContainerStyled>
  );
});

export default FormInput;

/* __________________________________________________________________________ *\
 ** Style
/* __________________________________________________________________________ */
const { colors, fonts, spacing } = theme;

const ContainerStyled = styled.div`
  max-width: 650px;
  grid-column: 2 / -1;

  .input__wrapper:has(.input:not(:placeholder-shown)) {
    & .input__icon {
      color: ${colors.neutral};
    }
  }

  .input__wrapper:is(.has-error) {
    & .container {
      outline-color: ${colors.status.danger};
    }
  }

  .container {
    padding: ${spacing.xs} ${spacing.md};
    background-color: ${colors.neutral_lightest};
    font: inherit;
    outline: 2px solid transparent;
    &:has(input:focus) {
      outline-color: ${colors.neutral};
    }
  }

  .input {
    color: ${colors.neutral};
    &::placeholder {
      color: ${colors.neutral_light};
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

  .input__icon {
    color: ${colors.neutral_light};
  }

  .input__errorMessage {
    margin-top: ${spacing['3xs']};
    display: flex;
    align-items: center;
    gap: ${spacing['4xs']};
    color: ${colors.status.danger};
    font-size: ${fonts.size.xs};
  }
`;
