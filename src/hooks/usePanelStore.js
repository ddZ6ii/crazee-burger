import { useCallback, useContext, useState } from 'react';
import { AdminPanelContext } from '../contexts/AdminPanelContext';

//!TODO: replace useState by useReducer...
//!TODO: handle page refresh...
export const usePanelStore = () => {
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
  useContext(AdminPanelContext).isPanelVisible,
  useContext(AdminPanelContext).showPanel,
];

export const useExpandPanel = () => [
  useContext(AdminPanelContext).isPanelExpanded,
  useContext(AdminPanelContext).expandPanel,
];

export const usePanelTab = () => [
  useContext(AdminPanelContext).activeTab,
  useContext(AdminPanelContext).selectActiveTab,
];
