import { useState } from 'react';

export default function LoginForm() {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (e) => setInputValue(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Welcome ${inputValue}!`);
    setInputValue('');
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
      <button type="submit">Log in to my account</button>
    </form>
  );
}
