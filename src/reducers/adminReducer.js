import * as Actions from './actions/adminActionTypes';

export const initialState = {
  isAdminMode: false,
  isPanelExpanded: true,
  activeTabId: 0,
  selectedProductId: null,
};

export const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.SHOW_PANEL: {
      return { ...state, isAdminMode: action.isAdmin };
    }
    case Actions.EXPAND_PANEL: {
      return { ...state, isPanelExpanded: action.isExpanded };
    }
    case Actions.CHANGE_TAB: {
      return { ...state, activeTabId: action.tabId };
    }
    case Actions.SELECT_PRODUCT: {
      return { ...state, selectedProductId: action.productId };
    }
    case Actions.DESELECT_PRODUCT: {
      return { ...state, selectedProductId: initialState.selectedProductId };
    }
    case Actions.RESET: {
      return { ...initialState };
    }
    default: {
      throw new Error(`Unknown action: ${action.type}`);
    }
  }
};
