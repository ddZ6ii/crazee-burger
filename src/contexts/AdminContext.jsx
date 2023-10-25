import { createContext, useCallback, useEffect, useReducer } from 'react';
import * as Actions from '../reducers/actions/adminActions';
import { initialAdminState, adminReducer } from '../reducers/adminReducer';

export const AdminContext = createContext(null);

const STORAGE_KEY = 'admin';

const initAdmin = (initialState) => {
  const adminInfo = JSON.parse(sessionStorage.getItem(STORAGE_KEY));
  return adminInfo ?? initialState;
};

export const AdminProvider = ({ children }) => {
  const [state, dispatch] = useReducer(
    adminReducer,
    initialAdminState,
    initAdmin
  );

  const showPanel = useCallback((isAdmin) => {
    dispatch(Actions.showPanel(isAdmin));
  }, []);

  const expandPanel = useCallback(
    (isExpanded) => dispatch(Actions.expandPanel(isExpanded)),
    []
  );
  const selectActiveTab = useCallback(
    (tabId) => dispatch(Actions.selectActiveTab(tabId)),
    []
  );
  const resetPanelInfo = useCallback(
    () => dispatch(Actions.resetPanelInfo()),
    []
  );

  const admin = {
    isAdminMode: state.isAdminMode,
    isPanelExpanded: state.isPanelExpanded,
    activeTab: state.activeTabId,
    showPanel,
    expandPanel,
    selectActiveTab,
    resetPanelInfo,
  };

  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  return (
    <AdminContext.Provider value={admin}>{children}</AdminContext.Provider>
  );
};
