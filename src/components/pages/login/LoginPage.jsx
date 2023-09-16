import styled from 'styled-components';
import LoginForm from './LoginForm';
import Logo from '../../common/Logo';
import background from '/assets/images/background-burger.jpg';
import { theme } from '../../../themes';

export default function LoginPage() {
  return (
    <SectionStyled>
      <Logo className="logo" />
      <LoginForm />
    </SectionStyled>
  );
}
/* __________________________________________________________________________ *\
 ** Style
/* __________________________________________________________________________ */
const { breakpoints, fonts, overlay, spacing } = theme;

const SectionStyled = styled.section`
  min-height: 100dvh;
  padding: 0 ${spacing.md} ${spacing['5xl']} ${spacing.md};

  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: ${spacing.xl};

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: center / cover no-repeat url(${background}) ${overlay.dark};
    background-blend-mode: darken;
    z-index: -1;
  }

  @media screen and (max-width: ${breakpoints.lg}) and (orientation: landscape) {
    padding: ${spacing.sm} ${spacing.lg};
    height: 100dvh;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;

    .logo {
      flex-direction: column;
      align-items: center;
      & span {
        font-size: ${fonts.size['4xl']};
        letter-spacing: 1.5px;
        text-transform: uppercase;
      }
      & img {
        height: 75px;
        width: 100px;
      }
    }
  }
`;
