import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsPersonCircle } from 'react-icons/bs';
import { VscChevronRight } from 'react-icons/vsc';
import styled from 'styled-components';

import Input from '../../common/Input';

import Button from '../../common/Button';
import { useLogin } from '../../../hooks/useStore';
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
    <FormStyled onSubmit={handleSubmit}>
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
        <Button
          type="submit"
          label="Log in to my account"
          Icon={<VscChevronRight className="btn__icon" />}
        />
      </div>
    </FormStyled>
  );
}

/* __________________________________________________________________________ *\
 ** Style
/* __________________________________________________________________________ */
const { breakpoints, colors, fonts, spacing } = theme;

const FormStyled = styled.form`
  width: 100%;
  max-width: 400px;
  margin-inline: auto;

  color: ${colors.white};
  line-height: 1.271;
  font-weight: ${fonts.weight.bold};
  text-align: center;
  text-transform: uppercase;

  & h1 {
    font-size: clamp(${spacing.lg}, 6vw, ${spacing['2xl']});
  }

  & hr {
    width: clamp(200px, 55vw, 400px);
    margin-top: clamp(${spacing.md}, 5vw, ${spacing.lg});
    margin-bottom: clamp(${spacing['lg']}, 5vw, ${spacing['xl']});
    margin-inline: auto;

    border: 1px solid ${colors.accent};
  }

  & h2 {
    font-size: clamp(${fonts.size.xl}, 4.2vw, ${fonts.size['2xl']});
  }

  & .container {
    width: clamp(200px, 55vw, 400px);
    margin-inline: auto;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: ${spacing.sm};
  }

  & .input__icon {
    color: ${colors.neutral_light};
    font-size: clamp(${fonts.size.base}, 3vw, ${fonts.size.lg});
  }

  & .btn__icon {
    stroke-width: 2px;
  }

  @media screen and (max-width: ${breakpoints.lg}) and (orientation: landscape) {
    width: fit-content;
    margin-inline: initial;

    & h1 {
      font-size: ${fonts.size['3xl']};
    }

    & hr {
      margin: ${spacing.md} auto;
    }

    & .container {
      max-width: 250px;
      gap: ${spacing.xs};
    }
  }
`;
