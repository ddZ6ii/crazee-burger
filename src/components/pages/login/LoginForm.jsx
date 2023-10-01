import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsPersonCircle } from 'react-icons/bs';
import styled from 'styled-components';

import Input from '../../common/Input';

import Button from '../../common/Button';
import { useLogin } from '../../../hooks/useUser';
import { theme } from '../../../themes';

export default function LoginForm() {
  const navigate = useNavigate();
  const login = useLogin();
  const [userName, setUserName] = useState('');

  const handleChange = (e) => setUserName(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    login(userName);
    setUserName('');
    navigate('/order');
  };

  return (
    <LoginFormStyled onSubmit={handleSubmit}>
      <h1>Welcome to the app !</h1>
      <hr />
      <div className="container">
        <h2>Log In</h2>
        <Input
          value={userName}
          onChange={handleChange}
          placeholder="Enter your name"
          Icon={<BsPersonCircle className="input__icon" />}
        />
        <Button type="submit" label="Sign In" />
      </div>
    </LoginFormStyled>
  );
}

/* __________________________________________________________________________ *\
 ** Style
/* __________________________________________________________________________ */
const { breakpoints, colors, fonts, spacing } = theme;

const LoginFormStyled = styled.form`
  width: 100%;
  max-width: 250px;
  margin-inline: auto;
  color: ${colors.white};
  line-height: 1.271;
  font-weight: ${fonts.weight.bold};
  text-align: center;
  text-transform: uppercase;

  & h1 {
    font-size: ${fonts.size['2xl']};
  }

  & hr {
    width: 100%;
    margin: ${spacing.md} auto ${spacing['2xl']};
    border: 1px solid ${colors.accent};
  }

  & h2 {
    font-size: ${fonts.size.xl};
  }

  & .container {
    margin-inline: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: ${spacing.sm};
  }

  & .input__icon {
    color: ${colors.neutral_light};
    font-size: ${fonts.size.base};
  }

  & .btn__icon {
    stroke-width: 2px;
  }

  @media screen and (min-width: ${breakpoints.md}) {
    max-width: 400px;

    & h1 {
      font-size: ${fonts.size['3xl']};
    }

    & h2 {
      font-size: ${fonts.size['2xl']};
    }

    & hr {
      margin-top: ${spacing.lg};
      margin-bottom: ${spacing.xl};
    }

    & .input__icon {
      font-size: ${fonts.size.lg};
    }
  }

  @media screen and (orientation: landscape) and (max-width: ${breakpoints.lg}) {
    max-width: 250px;

    & h1 {
      font-size: ${fonts.size['2xl']};
    }

    & hr {
      margin: ${spacing.xs} auto ${spacing.md};
    }

    & h2 {
      font-size: ${fonts.size.xl};
    }

    & .container {
      gap: ${spacing.xs};
    }
  }
`;
