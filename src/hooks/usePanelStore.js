import { useCallback, useContext, useState } from 'react';
import { AdminPanelContext } from '../contexts/AdminPanelContext';

//!TODO: handle page refresh...
export const usePanelStore = () => {
  const [isAdminPanelVisible, setIsPanelVisible] = useState(false);
  const [isAdminPanelExpanded, setIsPanelExpanded] = useState(false);

  const showAdminPanel = useCallback((bool) => setIsPanelVisible(bool), []);
  const expandAdminPanel = useCallback((bool) => setIsPanelExpanded(bool), []);

  console.log('context re-rendered');

  return {
    isAdminPanelVisible,
    showAdminPanel,
    isAdminPanelExpanded,
    expandAdminPanel,
  };
};

export const useShowPanel = () => [
  useContext(AdminPanelContext).isAdminPanelVisible,
  useContext(AdminPanelContext).showAdminPanel,
];

export const useExpandPanel = () => [
  useContext(AdminPanelContext).isAdminPanelExpanded,
  useContext(AdminPanelContext).expandAdminPanel,
];
