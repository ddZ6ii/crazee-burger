import { AdminPanelContext } from './AdminPanelContext';
import { usePanelStore } from '../hooks/usePanelStore';

export default function AdminPanelContextProvider({ children }) {
  return (
    <AdminPanelContext.Provider value={usePanelStore()}>
      {children}
    </AdminPanelContext.Provider>
  );
}
