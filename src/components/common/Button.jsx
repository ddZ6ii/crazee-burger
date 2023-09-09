import styled from 'styled-components';

import { theme } from '../../themes';

export default function Button({
  type = 'button',
  label,
  Icon,
  className = '',
  onClick = null,
}) {
  return (
    <ButtonStyled type={type} className={className} onClick={onClick}>
      <span>{label}</span>
      {Icon && Icon}
    </ButtonStyled>
  );
}

/* __________________________________________________________________________ *\
 ** Style
/* __________________________________________________________________________ */
const { blur, borderRadius, colors, fonts, spacing } = theme;

const ButtonStyled = styled.button`
  padding: clamp(${spacing.xs}, 3vw, ${spacing.md});
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${spacing['2xs']};

  background-color: rgba(255, 160, 27, 0.6);
  backdrop-filter: ${blur};
  border: 1px solid transparent;
  border-radius: ${borderRadius.rounded};

  color: ${colors.white};
  cursor: pointer;
  line-height: 1;
  font-family: ${fonts.family.cta};
  font-size: clamp(${fonts.size.sm}, 3vw, ${fonts.size.base});
  transition-duration: 0.2s;
  transition-timing-function: ease;
  transition-property: background-color, background-color, border-color;

  &:focus {
    outline-color: ${colors.accent};
  }

  &:hover {
    background-color: rgba(255, 160, 27, 0.8);
  }
`;