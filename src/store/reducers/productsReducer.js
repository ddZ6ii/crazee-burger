import * as Actions from '../actions/productsActionsTypes';
import * as Menus from '../../data/fakeMenus';

export const initialProducts = Menus.LARGE;
// export const initialProducts = null;

export const productsReducer = (products = initialProducts, action) => {
  switch (action.type) {
    case Actions.ADD_PRODUCT: {
      return [...products, action.product];
    }
    case Actions.UPDATE_PRODUCT: {
      return products.map((p) =>
        p.id === action.product.id ? action.product : p
      );
    }
    case Actions.DELETE_PRODUCT: {
      return products.filter((p) => p.id !== action.productId);
    }
    case Actions.RESET_PRODUCTS: {
      return [...initialProducts];
    }
    default: {
      throw new Error(`Unknown action: ${action.type}`);
    }
  }
};
