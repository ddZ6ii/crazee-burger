import { AdminContext } from '../contexts/AdminContext';
import { useAdminStore } from '../hooks/useAdmin';

export default function AdminContextProvider({ children }) {
  return (
    <AdminContext.Provider value={useAdminStore()}>
      {children}
    </AdminContext.Provider>
  );
}
