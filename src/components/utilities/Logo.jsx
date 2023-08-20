import styled from 'styled-components';
import { theme } from '../../themes';
import logo from '../../assets/images/logo-orange.png';

export default function Logo() {
  return (
    <LogoStyled>
      <h1>Crazee</h1>
      <img src={logo} alt="crazee burger logo" />
      <h1>Burger</h1>
    </LogoStyled>
  );
}

/* __________________________________________________________________________ *\
 ** Style
/* __________________________________________________________________________ */
const { colors, fontFamily, fontWeight, spacing } = theme;

const LogoStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: clamp(${spacing['2xs']}, 3vw, ${spacing.md});

  & h1 {
    color: ${colors.accent};
    font-family: ${fontFamily.headings};
    font-size: clamp(3rem, 13vw, 6.875rem);
    font-weight: ${fontWeight.bold};
    letter-spacing: 1.5px;
    text-transform: uppercase;
  }

  & img {
    max-height: clamp(60px, 17vw, 150px);
    width: auto;
    aspect-ratio: 1.333;
  }
`;
