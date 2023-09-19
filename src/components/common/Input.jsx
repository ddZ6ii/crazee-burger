import styled from 'styled-components';

import { theme } from '../../themes';

export default function Input({
  label = 'name',
  labelValue = '',
  value,
  onChange,
  Icon,
  ...restProps
}) {
  return (
    <StyledInput>
      <label htmlFor={label}>
        <span>{labelValue}</span>
        <div className="wrapper">
          {Icon && Icon}
          <input
            id={label}
            type="text"
            required
            value={value}
            onChange={onChange}
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
const { blur, borderRadius, breakpoints, colors, fonts, spacing } = theme;

const StyledInput = styled.div`
  width: 100%;

  & label {
    display: flex;
    flex-direction: column;
    gap: ${spacing['2xs']};

    &:focus-within svg,
    &:has(input:not(:placeholder-shown)) svg {
      fill: ${colors.accent};
    }
  }

  & .wrapper {
    padding: ${spacing.xs};
    width: 100%;

    display: flex;
    align-items: center;
    gap: ${spacing.xs};

    border-radius: ${borderRadius.rounded};
    background-color: rgba(255, 255, 255, 0.1);
    backdrop-filter: ${blur};

    &:has(input:focus) {
      outline: 1px solid ${colors.accent};
      background-color: rgba(255, 255, 255, 0.2);
    }
  }

  & input {
    background: none;
    color: ${colors.white};
    line-height: 1;
    font-size: ${fonts.size.sm};
    font-family: ${fonts.family.cta};
    font-weight: ${fonts.weight.regular};

    &:focus {
      outline-color: ${colors.neutral_light};
    }
    &::placeholder {
      color: ${colors.neutral_light};
    }
    &:focus {
      outline: none;
    }
  }

  @media screen and (min-width: ${breakpoints.md}) {
    & .wrapper {
      padding: ${spacing.md};
    }
    & input {
      font-size: ${fonts.size.base};
    }
  }

  @media screen and (orientation: landscape) and (max-width: ${breakpoints.lg}) {
    & .wrapper {
      padding: ${spacing.xs};
    }
    & input {
      font-size: ${fonts.size.sm};
    }
  }
`;
