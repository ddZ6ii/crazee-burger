import { useCallback, useContext, useEffect, useState } from 'react';
import { UserContext } from '../contexts/UserContext';

export const useStore = () => {
  const STORAGE_KEY = 'user';

  const [userName, setUserName] = useState(null);

  const login = useCallback((userInfo) => {
    setUserName(userInfo);
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(userInfo));
  }, []);

  const logout = useCallback(() => {
    setUserName(null);
    sessionStorage.removeItem(STORAGE_KEY);
  }, []);

  useEffect(() => {
    const userInfo = JSON.parse(sessionStorage.getItem(STORAGE_KEY));
    if (userInfo) setUserName(userInfo);
  }, []);

  return {
    userName,
    login,
    logout,
  };
};

export const useUserName = () => useContext(UserContext).userName;
export const useLogin = () => useContext(UserContext).login;
export const useLogout = () => useContext(UserContext).logout;
