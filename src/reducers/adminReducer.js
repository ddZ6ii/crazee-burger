import * as Actions from './actions/adminActionTypes';

export const initialAdminState = {
  isAdminMode: false,
  isPanelExpanded: true,
  activeTabId: 0,
  selectedProductId: null,
};

export const adminReducer = (state = initialAdminState, action) => {
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
    case Actions.RESET: {
      return { ...initialAdminState };
    }
    default: {
      throw new Error(`Unknown action: ${action.type}`);
    }
  }
};
