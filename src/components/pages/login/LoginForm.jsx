import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useUserContext from '../../../hooks/useUserContext';

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
    <form action="" onSubmit={handleSubmit}>
      <h1>Welcome to our app!</h1>
      <br />
      <h2>Please log in to continue</h2>
      <input
        type="text"
        placeholder="Enter your firstname..."
        required
        value={inputValue}
        onChange={handleChange}
      />
      <button type="submit">Log in</button>
    </form>
  );
}
