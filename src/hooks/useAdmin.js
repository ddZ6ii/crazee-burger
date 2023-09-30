import { useCallback, useContext, useEffect, useReducer } from 'react';

import * as Actions from '../store/actions/adminActions';
import { AdminContext } from '../contexts/AdminContext';
import {
  initialAdminState,
  adminReducer,
} from '../store/reducers/AdminReducer';

const STORAGE_KEY = 'admin';

const initAdmin = (initialState) => {
  const adminInfo = JSON.parse(sessionStorage.getItem(STORAGE_KEY));
  return adminInfo ?? initialState;
};

// to be passed as the value for the context provider
export const useAdminStore = () => {
  const [state, dispatch] = useReducer(
    adminReducer,
    initialAdminState,
    initAdmin
  );

  const handleShowPanel = useCallback((isAdmin) => {
    dispatch(Actions.showPanel(isAdmin));
  }, []);

  const handleExpandPanel = useCallback(
    (isExpanded) => dispatch(Actions.expandPanel(isExpanded)),
    []
  );
  const handleActiveTab = useCallback(
    (tabId) => dispatch(Actions.selectActiveTab(tabId)),
    []
  );

  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  return {
    isAdminMode: state.isAdminMode,
    isAdminPanelExpanded: state.isPanelExpanded,
    activeTab: state.activeTabId,
    handleShowPanel,
    handleExpandPanel,
    handleActiveTab,
  };
};

// custom hook to be used by context consumers
export const useAdmin = () => useContext(AdminContext);
