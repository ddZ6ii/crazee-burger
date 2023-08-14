import { useContext } from 'react';

import { UserContext } from '../contexts/UserContext';

const useUserContext = () => {
  const userContext = useContext(UserContext);
  if (userContext === undefined) {
    throw new Error('useAuthContext was used outside of its Provider!');
  }
  return userContext;
};

export default useUserContext;
