import styled from 'styled-components';
import LoginForm from './LoginForm';
import Logo from '../../common/Logo';
import background from '/assets/images/background-burger.jpg';
import { theme } from '../../../themes';

export default function LoginPage() {
  return (
    <LoginPageStyled>
      <Logo className="logo" />
      <LoginForm />
    </LoginPageStyled>
  );
}
/* __________________________________________________________________________ *\
 ** Style
/* __________________________________________________________________________ */
const { breakpoints, fonts, overlay, spacing } = theme;

const LoginPageStyled = styled.section`
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

  @media screen and (min-width: ${breakpoints.md}) {
    gap: ${spacing['6xl']};
  }

  @media screen and (orientation: landscape) and (max-width: ${breakpoints.lg}) {
    padding: ${spacing.sm} ${spacing.lg};
    gap: ${spacing.sm};

    .logo {
      & span {
        font-size: ${fonts.size['3xl']};
        letter-spacing: 1.5px;
        text-transform: uppercase;
      }
      & img {
        height: 60px;
        width: 80px;
      }
    }
  }
`;
