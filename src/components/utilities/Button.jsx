import styled from 'styled-components';

import { theme } from '../../themes';

export default function Button({ type = 'button', label, Icon }) {
  return (
    <ButtonStyled type={type}>
      <span>{label}</span>
      {Icon && Icon}
    </ButtonStyled>
  );
}

/* __________________________________________________________________________ *\
 ** Style
/* __________________________________________________________________________ */
const { blur, borderRadius, colors, fontFamily, fontSize, spacing } = theme;

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
  font-family: ${fontFamily.cta};
  font-size: clamp(${fontSize.sm}, 3vw, ${fontSize.base});
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
