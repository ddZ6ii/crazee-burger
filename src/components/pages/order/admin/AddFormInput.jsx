import styled from 'styled-components';
import { BiError } from 'react-icons/bi';

import Input from '../../../common/Input';
import { useProductForm } from '../../../../hooks/useProductForm';
import { classNames } from '../../../../utilities/classNames';
import { theme } from '../../../../themes';

export default function AddFormInput({
  form: { data: formData, errors: formErrors },
  inputData: { id, type, label, placeholder, isRequired, icon, klass, ...rest },
  className,
  handleBlur,
  handleChange,
}) {
  const { hasError } = useProductForm();

  return (
    <ContainerStyled className={className}>
      <Input
        type={type}
        label={label}
        placeholder={placeholder}
        isRequired={isRequired}
        Icon={icon}
        className={classNames(klass, hasError(label) && 'has-error')}
        value={formData[label] ?? ''}
        onBlur={handleBlur}
        onChange={handleChange}
        {...rest}
      />
      {hasError(label) && (
        <p key={id} className="input__errorMessage">
          <BiError /> {formErrors[label][0]}
        </p>
      )}
    </ContainerStyled>
  );
}

/* __________________________________________________________________________ *\
 ** Style
/* __________________________________________________________________________ */
const { colors, fonts, spacing } = theme;

const ContainerStyled = styled.div`
  .input__wrapper:has(.input:not(:placeholder-shown)) {
    & .input__icon {
      color: ${colors.neutral};
    }
  }

  .input__wrapper:is(.has-error) {
    & .container {
      outline-color: ${colors.info_danger};
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
    color: ${colors.info_danger};
    font-size: ${fonts.size.xs};
  }
`;
