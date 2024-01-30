import { useCallback, useContext } from 'react';
import { CartContext } from '../contexts/CartContext';
import { isEmpty } from '../utilities/checks';
import { roundPrice } from '../utilities/maths';

export const useCart = () => {
  const cartInfo = useContext(CartContext);

  if (cartInfo === null)
    throw new Error('useContext was used outside its CartContext provider');

  // Additionnal utilities functions that have nothing to do with CartContext state update logic
  const getCount = useCallback((cartItems) => {
    if (isEmpty(cartItems)) return 0;
    return Object.keys(cartItems).reduce(
      (total, [productId]) => total + cartItems[productId],
      0
    );
  }, []);

  const getTotalPrice = useCallback((cartItems, products) => {
    return Object.entries(cartItems).reduce(
      (total, [productId, productQty]) => {
        const currentProduct = products.find((p) => p.id === productId);
        if (isEmpty(currentProduct)) return 0;
        const totalProduct = productQty * roundPrice(currentProduct.price);
        return total + roundPrice(totalProduct);
      },
      0
    );
  }, []);

  return { ...cartInfo, getCount, getTotalPrice };
};
