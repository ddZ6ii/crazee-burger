import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { VscChevronRight } from 'react-icons/vsc';
import { BsPersonCircle } from 'react-icons/bs';
import styled from 'styled-components';

import useUserContext from '../../../hooks/useUserContext';
import { theme } from '../../../themes';

export default function LoginForm() {
  const { logInUser } = useUserContext();
  const [inputValue, setInputValue] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

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
        <label htmlFor="name">
          <BsPersonCircle />
          <input
            id="name"
            type="text"
            placeholder="Enter your name"
            required
            value={inputValue}
            onChange={handleChange}
          />
        </label>
        <button type="submit">
          <span>Log in to my account</span>
          <VscChevronRight />
        </button>
      </div>
    </Form>
  );
}

/* __________________________________________________________________________ *\
 ** Style
/* __________________________________________________________________________ */
const { borderRadius, colors, fontFamily, fontSize, fontWeight, spacing } =
  theme;

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

  label {
    width: 100%;
    position: relative;

    & svg {
      position: absolute;
      top: 50%;
      left: clamp(${spacing['2xs']}, 4vw, ${spacing.md});

      fill: ${colors.neutral};
      font-size: clamp(${fontSize.base}, 3vw, ${fontSize.lg});
      transform: translateY(-50%);
      z-index: 2;
    }
  }

  input,
  button {
    padding: clamp(${spacing.xs}, 3vw, ${spacing.md});
    width: 100%;

    border-radius: ${borderRadius.rounded};

    line-height: 1;
    font-family: ${fontFamily.inputs};
    font-size: clamp(${fontSize.sm}, 3vw, ${fontSize.base});

    &:focus {
      outline-color: ${colors.accent};
    }
  }

  input {
    padding-left: clamp(${spacing.xl}, 10vw, ${spacing['4xl']});
    color: ${colors.neutral_darkest};
    font-weight: ${fontWeight.regular};

    &::placeholder {
      color: ${colors.neutral_light};
    }
  }

  label:focus-within svg,
  label:has(input:not(:placeholder-shown)) svg {
    fill: ${colors.accent};
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: ${spacing['2xs']};

    background-color: ${colors.accent};
    border: 1px solid transparent;

    color: ${colors.white};
    cursor: pointer;
    transition-duration: 0.2s;
    transition-timing-function: ease;
    transition-property: background-color, background-color, border-color;

    &:hover {
      background-color: rgba(0, 0, 0, 0.5);
      backdrop-filter: blur(20px);
      border-color: ${colors.accent};
      color: ${colors.accent};
    }

    & svg {
      stroke-width: 2px;
    }
  }
`;
