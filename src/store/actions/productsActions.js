import * as Actions from './productsActionsTypes';
import { LARGE as initialProducts } from '../../data/fakeMenus';

const STORAGE_KEY = 'nextId';

let nextId =
  JSON.parse(sessionStorage.getItem(STORAGE_KEY)) ?? initialProducts.length + 1;

export const addProduct = (product) => {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(nextId + 1));
  return {
    type: Actions.ADD_PRODUCT,
    product: { id: nextId++, ...product },
  };
};

export const updateProduct = (product) => ({
  type: Actions.CHANGE_PRODUCT,
  product,
});

export const deleteProduct = (productId) => ({
  type: Actions.DELETE_PRODUCT,
  productId,
});

export const resetProducts = () => ({
  type: Actions.RESET_PRODUCTS,
});
