import styled from 'styled-components';

import Logo from '../../utilities/Logo';
import LoginForm from './LoginForm';

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
const { spacing } = theme;

const Section = styled.section`
  min-height: 100dvh;
  padding: 0 20px 80px 20px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: ${spacing.xl};

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: center / cover no-repeat
      url('./src/assets/images/background-burger.jpg') rgba(0, 0, 0, 0.5);
    background-blend-mode: darken;
    z-index: -1;
  }
`;
