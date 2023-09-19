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
const { breakpoints, colors, fonts, spacing } = theme;

const LogoStyled = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${spacing['2xs']};
  background: none;

  & span {
    color: ${colors.accent};
    font-family: ${fonts.family.headings};
    font-size: ${fonts.size['3xl']};
    font-weight: ${fonts.weight.bold};
    letter-spacing: 1.5px;
    text-transform: uppercase;
  }

  & img {
    max-height: 60px;
    width: auto;
    aspect-ratio: 1.333;
  }

  @media screen and (min-width: ${breakpoints.md}) {
    gap: ${spacing.md};
    font-size: ${fonts.size['6xl']};

    & span {
      font-size: ${fonts.size['6xl']};
    }

    & img {
      max-height: 136px;
    }
  }
`;
