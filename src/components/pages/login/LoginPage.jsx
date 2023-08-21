import styled from 'styled-components';
import Logo from '../../utilities/Logo';
import LoginForm from './LoginForm';
import background from '../../../assets/images/background-burger.jpg';
import { theme } from '../../../themes';

export default function LoginPage() {
  return (
    <Section>
      <Logo />
      <LoginForm />
    </Section>
  );
}
/* __________________________________________________________________________ *\
 ** Style
/* __________________________________________________________________________ */
const { overlay, spacing } = theme;

const Section = styled.section`
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
`;
