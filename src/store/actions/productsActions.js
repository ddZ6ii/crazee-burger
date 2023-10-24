import * as Actions from './productsActionsTypes';

export const addProduct = (product, nextId) => {
  return {
    type: Actions.ADD_PRODUCT,
    product: { id: nextId, ...product },
  };
};

export const updateProduct = (product) => ({
  type: Actions.UPDATE_PRODUCT,
  product,
});

export const deleteProduct = (productId) => ({
  type: Actions.DELETE_PRODUCT,
  productId,
});

export const resetProducts = () => ({
  type: Actions.RESET_PRODUCTS,
});
