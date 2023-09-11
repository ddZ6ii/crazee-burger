import { UserContext } from './UserContext';
import { useStore } from '../hooks/useStore';

export default function UserContextProvider({ children }) {
  return (
    <UserContext.Provider value={useStore()}>{children}</UserContext.Provider>
  );
}
