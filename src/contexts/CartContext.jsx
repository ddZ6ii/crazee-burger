import { createContext, useCallback, useEffect, useState } from 'react';
import { deepClone } from '../utilities/deepClone';
import { getProductQty, isProductInCart } from '../utilities/cart';

const STORAGE_KEY = 'cart';

const initialCartInfo = {
  showCart: false,
  items: [],
};

const initCart = () => {
  const cartInfo = JSON.parse(sessionStorage.getItem(STORAGE_KEY));
  return cartInfo ?? initialCartInfo;
};

export const CartContext = createContext(null);

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

  const addToCart = useCallback(
    (productId, qty = 1) => {
      if (isProductInCart(productId, cart.items)) {
        const nextCartItems = cart.items.map((item) =>
          item.id === productId ? { ...item, qty: item.qty + qty } : { ...item }
        );
        setCart({ ...cart, items: nextCartItems });
      } else {
        const nextCartItem = { id: productId, qty };
        setCart({ ...cart, items: [nextCartItem, ...deepClone(cart.items)] });
      }
    },
    [cart]
  );

  const deleteFromCart = useCallback(
    (productId) => {
      if (!isProductInCart(productId, cart.items)) return;
      const nextCartItems = cart.items.filter((item) => item.id !== productId);
      setCart({ ...cart, items: nextCartItems });
    },
    [cart]
  );

  const removeFromCart = useCallback(
    (productId, qty = 1) => {
      if (!isProductInCart(productId, cart.items)) return;
      if (getProductQty(productId, cart.items) > 1) {
        const nextCartItems = cart.items.map((item) =>
          item.id === productId ? { ...item, qty: item.qty - qty } : { ...item }
        );
        setCart({ ...cart, items: nextCartItems });
        return;
      }
      const nextCartItems = cart.items.filter((item) => item.id !== productId);
      setCart({ ...cart, items: nextCartItems });
    },
    [cart]
  );

  const setItemQty = useCallback(
    (productId, qty = 1) => {
      if (!isProductInCart(productId, cart.items)) return;
      if (qty >= 1) {
        const nextCartItems = cart.items.map((item) =>
          item.id === productId ? { ...item, qty } : { ...item }
        );
        setCart({ ...cart, items: nextCartItems });
        return;
      }
      const nextCartItems = cart.items.filter((item) => item.id !== productId);
      setCart({ ...cart, items: nextCartItems });
    },
    [cart]
  );

  const contextValue = {
    cart,
    toggleCart,
    addToCart,
    removeFromCart,
    deleteFromCart,
    setItemQty,
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};
