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

  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  return {
    isAdminMode: state.isAdminMode,
    isPanelExpanded: state.isPanelExpanded,
    activeTab: state.activeTabId,
    showPanel,
    expandPanel,
    selectActiveTab,
    resetPanelInfo,
  };
};

// custom hook to be used by context consumers
export const useAdmin = () => useContext(AdminContext);
