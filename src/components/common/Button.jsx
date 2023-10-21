import styled from 'styled-components';

import { theme } from '../../themes';

export default function Button({
  type = 'button',
  label,
  Icon,
  className = '',
  onClick = null,
  ...restProps
}) {
  return (
    <ButtonStyled
      type={type}
      className={className}
      onClick={onClick}
      {...restProps}
    >
      <span>{label}</span>
      {Icon && Icon}
    </ButtonStyled>
  );
}

/* __________________________________________________________________________ *\
 ** Style
/* __________________________________________________________________________ */
const { colors, borderRadius, breakpoints, fonts, spacing } = theme;

const ButtonStyled = styled.button`
  padding: ${spacing.xs};
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${spacing['2xs']};

  border: 1px solid transparent;
  border-radius: ${borderRadius.rounded};

  color: ${colors.white};
  cursor: pointer;
  line-height: 1;
  font-family: ${fonts.family.cta};
  font-size: ${fonts.size.sm};
  transition-duration: 0.3s;
  transition-timing-function: ease;
  transition-property: background-color, background-color, border-color, color;

  @media screen and (min-width: ${breakpoints.md}) {
    padding: ${spacing.md};
    font-size: ${fonts.size.base};
  }

  @media screen and (orientation: landscape) and (max-width: ${breakpoints.lg}) {
    padding: ${spacing.xs};
    font-size: ${fonts.size.sm};
  }
`;
