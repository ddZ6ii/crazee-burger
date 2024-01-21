import { useContext } from 'react';
import { AdminContext } from '../contexts/AdminContext';

export const useAdmin = () => {
  const admin = useContext(AdminContext);
  if (admin === null)
    throw Error('useAdmin was used outside its AdminContext provider');
  return admin;
};
