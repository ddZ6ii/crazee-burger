import * as Actions from './productsActionsTypes';

export const addProduct = (product) => ({
  type: Actions.ADD_PRODUCT,
  product,
});

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
