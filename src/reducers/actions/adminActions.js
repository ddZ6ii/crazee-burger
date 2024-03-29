import * as Actions from './adminActionTypes';

export const showPanel = (isAdmin) => ({
  type: Actions.SHOW_PANEL,
  isAdmin,
});

export const expandPanel = (isExpanded) => ({
  type: Actions.EXPAND_PANEL,
  isExpanded,
});

export const selectActiveTab = (tabId) => ({
  type: Actions.CHANGE_TAB,
  tabId,
});

export const selectProduct = (productId) => ({
  type: Actions.SELECT_PRODUCT,
  productId,
});

export const deselectProduct = () => ({
  type: Actions.DESELECT_PRODUCT,
});

export const resetPanelInfo = () => ({
  type: Actions.RESET,
});
