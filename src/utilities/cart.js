export const isProductInCart = (productId, cartItems) =>
  cartItems.some((cartItem) => cartItem.id === productId);

export const getProductQty = (productId, cartItems) =>
  cartItems.find((item) => item.id === productId).qty;
