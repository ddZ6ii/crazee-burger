import { useNavigate } from 'react-router-dom';

import useUserContext from '../../../hooks/useUserContext';

export default function OrderPage() {
  const navigate = useNavigate();
  const { userName, logOutUser } = useUserContext();

  const handleClick = () => {
    logOutUser();
    navigate('/');
  };

  return (
    <>
      <h1>Hello {userName}</h1>
      <button type="button" onClick={handleClick}>
        Log out
      </button>
    </>
  );
}
