import styled from 'styled-components';
import { forwardRef } from 'react';

import { theme } from '../../themes';

const Input = forwardRef(function Input(
  {
    label = 'name',
    type = 'text',
    labelValue = '',
    isRequired = true,
    value,
    // Use PascalCase for 'Icon' to avoid landing into '...restProps'
    Icon,
    onChange,
    className = '',
    ...restProps
  },
  ref
) {
  return (
    <StyledInput className={className}>
      <label htmlFor={label} className="label">
        {labelValue && <span>{labelValue}</span>}
        <div className="container">
          {Icon && Icon}
          <input
            ref={ref}
            id={label}
            name={label}
            type={type}
            required={isRequired}
            value={value}
            onChange={onChange}
            className="input"
            {...restProps}
          />
        </div>
      </label>
    </StyledInput>
  );
});

export default Input;

/* __________________________________________________________________________ *\
 ** Style
/* __________________________________________________________________________ */
const { borderRadius, breakpoints, fonts, spacing } = theme;

const StyledInput = styled.div`
  width: 100%;

  .label {
    display: flex;
    flex-direction: column;
    gap: ${spacing['2xs']};
  }

  .container {
    padding: ${spacing.xs};
    width: 100%;

    display: flex;
    align-items: center;
    gap: ${spacing.xs};

    border-radius: ${borderRadius.rounded};

    line-height: 1;
    font-size: ${fonts.size.sm};
    font-family: ${fonts.family.cta};
    font-weight: ${fonts.weight.regular};
  }

  & .input {
    flex-grow: 1;
    background: none;
    &:focus {
      outline: none;
    }
  }

  @media screen and (min-width: ${breakpoints.md}) {
    .container {
      padding: ${spacing.md};
      font-size: ${fonts.size.base};
    }
  }

  @media screen and (orientation: landscape) and (max-width: ${breakpoints.lg}) {
    .container {
      padding: ${spacing.xs};
      font-size: ${fonts.size.sm};
    }
  }
`;
