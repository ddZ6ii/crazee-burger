// import { useMemo, useState } from 'react';
import { useCallback, useEffect, useState } from 'react';

import { UserContext } from './UserContext';

export default function UserContextProvider({ children }) {
  const [userName, setUserName] = useState(null);

  const SESSION_STORAGE_KEY = 'user';

  const logInUser = useCallback((userInfo) => {
    sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(userInfo));
    setUserName(userInfo);
  }, []);

  const logOutUser = useCallback(() => {
    sessionStorage.removeItem(SESSION_STORAGE_KEY);
    setUserName(null);
  }, []);

  useEffect(() => {
    const userInfo = JSON.parse(sessionStorage.getItem(SESSION_STORAGE_KEY));
    if (userInfo) setUserName(userInfo);
  }, []);

  const contextValue = {
    userName,
    logInUser,
    logOutUser,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
}
