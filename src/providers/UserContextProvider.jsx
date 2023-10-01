import { UserContext } from '../contexts/UserContext';
import { useUserStore } from '../hooks/useUser';

export default function UserContextProvider({ children }) {
  return (
    <UserContext.Provider value={useUserStore()}>
      {children}
    </UserContext.Provider>
  );
}
