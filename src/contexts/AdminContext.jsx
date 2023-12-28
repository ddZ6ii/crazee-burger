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
    (isExpanded = true) => dispatch(Actions.expandPanel(isExpanded)),
    []
  );
  const selectActiveTab = useCallback(
    (tabId) => dispatch(Actions.selectActiveTab(tabId)),
    []
  );
  const selectProduct = useCallback(
    (productId) => dispatch(Actions.selectProduct(productId)),
    []
  );
  const resetPanelInfo = useCallback(() => {
    dispatch(Actions.resetPanelInfo());
  }, []);

  const admin = {
    ...state,
    showPanel,
    expandPanel,
    selectActiveTab,
    selectProduct,
    resetPanelInfo,
  };

  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    return () => {
      sessionStorage.removeItem(STORAGE_KEY);
    };
  }, [state]);

  return (
    <AdminContext.Provider value={admin}>{children}</AdminContext.Provider>
  );
};
