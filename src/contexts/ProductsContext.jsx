import { createContext, useCallback, useEffect, useReducer } from 'react';
import { productsReducer, initialProducts } from '../reducers/productsReducer';
import * as Actions from '../reducers/actions/productsActions';

export const ProductsContext = createContext(null);

const STORAGE_KEY_PRODUCTS = 'products';

const initProducts = (initialProducts) => {
  const products = JSON.parse(sessionStorage.getItem(STORAGE_KEY_PRODUCTS));
  return products ?? initialProducts;
};

export const ProductsProvider = ({ children }) => {
  const [products, dispatch] = useReducer(
    productsReducer,
    initialProducts,
    initProducts
  );

  const addProduct = useCallback((productInfo) => {
    dispatch(Actions.addProduct(productInfo));
  }, []);

  const updateProduct = useCallback(
    (product) => dispatch(Actions.updateProduct(product)),
    []
  );

  const deleteProduct = useCallback(
    (productId) => dispatch(Actions.deleteProduct(productId)),
    []
  );

  const resetProducts = useCallback(
    () => dispatch(Actions.resetProducts()),
    []
  );

  const productInfo = {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    resetProducts,
  };

  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY_PRODUCTS, JSON.stringify(products));
  }, [products]);

  return (
    <ProductsContext.Provider value={productInfo}>
      {children}
    </ProductsContext.Provider>
  );
};
