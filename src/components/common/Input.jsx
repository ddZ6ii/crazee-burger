import styled from 'styled-components';

import { theme } from '../../themes';

export default function Input({
  label = 'name',
  type = 'text',
  labelValue = '',
  isRequired = true,
  value,
  onChange,
  onBlur = null,
  Icon,
  className = '',
  ...restProps
}) {
  return (
    <StyledInput className={className}>
      <label htmlFor={label} className="label">
        {labelValue && <span>{labelValue}</span>}
        <div className="container">
          {Icon && Icon}
          <input
            id={label}
            name={label}
            type={type}
            required={isRequired}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            className="input"
            {...restProps}
          />
        </div>
      </label>
    </StyledInput>
  );
}
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
