import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsPersonCircle } from 'react-icons/bs';
import { VscChevronRight } from 'react-icons/vsc';
import styled from 'styled-components';

import Input from '../../utilities/Input';

import Button from '../../utilities/Button';
import useUserContext from '../../../hooks/useUserContext';
import { theme } from '../../../themes';

export default function LoginForm() {
  const navigate = useNavigate();
  const { logInUser } = useUserContext();

  const [inputValue, setInputValue] = useState('');

  const handleChange = (e) => setInputValue(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    logInUser(inputValue);
    setInputValue('');
    navigate('/order');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h1>Welcome to the app !</h1>
      <hr />
      <div className="container">
        <h2>Log In</h2>
        <Input
          value={inputValue}
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
    </Form>
  );
}

/* __________________________________________________________________________ *\
 ** Style
/* __________________________________________________________________________ */
const { colors, fontFamily, fontSize, fontWeight, spacing } = theme;

const Form = styled.form`
  width: 100%;
  max-width: 400px;
  margin-inline: auto;

  color: ${colors.white};
  line-height: 1.271;
  font-family: ${fontFamily.headings};
  font-weight: ${fontWeight.bold};
  text-align: center;
  text-transform: uppercase;

  & h1 {
    font-size: clamp(2rem, 6vw, 3rem);
  }

  & hr {
    width: clamp(200px, 55vw, 400px);
    margin-top: clamp(${spacing.md}, 5vw, ${spacing.lg});
    margin-bottom: clamp(${spacing['lg']}, 5vw, ${spacing['xl']});
    margin-inline: auto;

    border: 1px solid ${colors.accent};
  }

  & h2 {
    font-size: clamp(1.5rem, 4.2vw, 2.25rem);
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
    font-size: clamp(${fontSize.base}, 3vw, ${fontSize.lg});
  }

  & .btn__icon {
    stroke-width: 2px;
  }
`;
