import { useCallback, useContext, useState } from 'react';
import { AdminContext } from '../contexts/AdminContext';

//!TODO: replace useState by useReducer...
//!TODO: handle page refresh...
export const useAdminStore = () => {
  const [isPanelVisible, setIsPanelVisible] = useState(false);
  const [isPanelExpanded, setIsPanelExpanded] = useState(true);
  const [activeTab, setActiveTab] = useState(1);

  const showPanel = useCallback((bool) => setIsPanelVisible(bool), []);
  const expandPanel = useCallback((bool) => setIsPanelExpanded(bool), []);
  const selectActiveTab = useCallback((tabId) => setActiveTab(tabId), []);

  return {
    isPanelVisible,
    showPanel,
    isPanelExpanded,
    expandPanel,
    activeTab,
    selectActiveTab,
  };
};

export const useShowPanel = () => [
  useContext(AdminContext).isPanelVisible,
  useContext(AdminContext).showPanel,
];

export const useExpandPanel = () => [
  useContext(AdminContext).isPanelExpanded,
  useContext(AdminContext).expandPanel,
];

export const usePanelTab = () => [
  useContext(AdminContext).activeTab,
  useContext(AdminContext).selectActiveTab,
];
