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
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: ${spacing['2xs']};

    &:focus-within svg,
    &:has(input:not(:placeholder-shown)) svg {
      fill: ${colors.accent};
    }
  }

  & .wrapper {
    display: flex;
    align-items: center;
    gap: ${spacing.xs};

    padding: clamp(${spacing.xs}, 3vw, ${spacing.md});
    @media screen and (max-width: ${breakpoints.lg}) and (orientation: landscape) {
      padding: ${spacing.xs};
    }

    width: 100%;

    border-radius: ${borderRadius.rounded};
    background-color: rgba(255, 255, 255, 0.1);
    backdrop-filter: ${blur};

    &:has(input:focus) {
      outline: 1px solid ${colors.accent};
      background-color: rgba(255, 255, 255, 0.2);
    }
  }

  & input {
    width: 100%;

    background: none;

    color: ${colors.white};
    line-height: 1;
    font-size: clamp(${fonts.size.sm}, 3vw, ${fonts.size.base});
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
`;
