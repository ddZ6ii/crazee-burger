import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

export const useAuth = () => {
  const auth = useContext(AuthContext);
  if (auth === null)
    throw Error('useLogout was used outside its AuthContext provider');
  return auth;
};
