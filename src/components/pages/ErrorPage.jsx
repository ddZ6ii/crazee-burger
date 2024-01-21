import { useNavigate } from 'react-router-dom';

export default function ErrorPage() {
  const navigate = useNavigate();
  return (
    <>
      <h1>Error Page</h1>
      <button type="button" onClick={() => navigate('/')}>
        Go back to home page
      </button>
    </>
  );
}
