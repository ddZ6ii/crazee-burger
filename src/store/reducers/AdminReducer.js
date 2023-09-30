import * as Actions from '../actions/adminActionTypes';

export const initialAdminState = {
  isAdminMode: false,
  isPanelExpanded: false,
  activeTabId: 1,
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
    default: {
      throw new Error(`Unknown action: ${action.type}`);
    }
  }
};
