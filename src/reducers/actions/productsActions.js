import * as Actions from './productsActionsTypes';

export const addProduct = (productInfo) => {
  return {
    type: Actions.ADD_PRODUCT,
    product: { id: crypto.randomUUID(), ...productInfo },
  };
};

export const editProduct = (productId, fieldName, fieldValue) => ({
  type: Actions.EDIT_PRODUCT,
  productId,
  fieldName,
  fieldValue,
});

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
