import styled from 'styled-components';
import { theme } from '../../themes';
import logo from '/assets/images/logo-orange.png';

export default function Logo({ className = '', onClick = null }) {
  return (
    <LogoStyled className={className} onClick={onClick}>
      <span>Crazee</span>
      <img src={logo} alt="crazee burger logo" />
      <span>Burger</span>
    </LogoStyled>
  );
}

/* __________________________________________________________________________ *\
 ** Style
/* __________________________________________________________________________ */
const { colors, fonts, spacing } = theme;

const LogoStyled = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: clamp(${spacing['2xs']}, 3vw, ${spacing.md});

  background: none;

  & span {
    color: ${colors.accent};
    font-family: ${fonts.family.headings};
    font-size: clamp(${fonts.size['3xl']}, 13vw, ${fonts.size['6xl']});
    font-weight: ${fonts.weight.bold};
    letter-spacing: 1.5px;
    text-transform: uppercase;
  }

  & img {
    max-height: clamp(60px, 17vw, 136px);
    width: auto;
    aspect-ratio: 1.333;
  }
`;
