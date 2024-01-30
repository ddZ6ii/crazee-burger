import { createContext, useCallback, useEffect, useState } from 'react';

import { deepClone } from '../utilities/deepClone';

export const CartContext = createContext(null);

const STORAGE_KEY = 'cart';

const initialCartInfo = {
  showCart: false,
  items: {},
};

const initCart = () => {
  const cartInfo = JSON.parse(sessionStorage.getItem(STORAGE_KEY));
  return cartInfo ?? initialCartInfo;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(initCart);

  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    return () => {
      sessionStorage.removeItem(STORAGE_KEY);
    };
  }, [cart]);

  const toggleCart = useCallback(
    () => setCart({ ...deepClone(cart), showCart: !cart.showCart }),
    [cart]
  );

  // const addProductToCart = useCallback(
  //   (productId, qty = 1) => {
  //     const nextCartItems = { ...cart.items };
  //     if (productId in cart.items) {
  //       nextCartItems[productId] += qty;
  //     } else {
  //       nextCartItems[productId] = qty;
  //     }
  //     setCart({ ...cart, items: nextCartItems });
  //   },
  //   [cart]
  // );

  // const removeProductFromCart = useCallback(
  //   (productId, qty = 1) => {
  //     if (!(productId in cart.items)) return;
  //     const nextCartItems = { ...cart.items };
  //     if (nextCartItems[productId] > 1) {
  //       nextCartItems[productId] -= qty;
  //     } else {
  //       delete nextCartItems[productId];
  //     }
  //     setCart({ ...cart, cartItems: nextCartItems });
  //   },
  //   [cart]
  // );

  const contextValue = {
    cart,
    toggleCart,
    // addProductToCart,
    // removeProductFromCart,
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};
