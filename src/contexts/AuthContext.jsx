import { createContext, useCallback, useState } from 'react';

export const AuthContext = createContext(null);

const STORAGE_KEY = 'user';

const initUserInfo = () => {
  const userInfo = JSON.parse(sessionStorage.getItem(STORAGE_KEY));
  return userInfo ?? null;
};

export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(initUserInfo);

  const login = useCallback((user) => {
    setUserInfo(user);
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  }, []);

  const logout = useCallback(() => {
    setUserInfo(null);
    sessionStorage.removeItem(STORAGE_KEY);
  }, []);

  const contextValue = { userInfo, login, logout };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
