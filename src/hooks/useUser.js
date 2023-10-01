import { useCallback, useContext, useState } from 'react';
import { UserContext } from '../contexts/UserContext';

const STORAGE_KEY = 'user';

const initUser = () => {
  const userInfo = JSON.parse(sessionStorage.getItem(STORAGE_KEY));
  return userInfo ?? null;
};

// to be passed as the value for the context provider
export const useUserStore = () => {
  const [userName, setUserName] = useState(initUser);

  const login = useCallback((userInfo) => {
    setUserName(userInfo);
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(userInfo));
  }, []);

  const logout = useCallback(() => {
    setUserName(null);
    sessionStorage.removeItem(STORAGE_KEY);
  }, []);

  return {
    userName,
    login,
    logout,
  };
};

// custom hooks to be used by context consumers
export const useUserName = () => useContext(UserContext).userName;
export const useLogin = () => useContext(UserContext).login;
export const useLogout = () => useContext(UserContext).logout;
