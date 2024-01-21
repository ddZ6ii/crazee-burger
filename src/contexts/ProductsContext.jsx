import { createContext, useCallback, useEffect, useReducer } from 'react';
import { productsReducer, initialProducts } from '../reducers/productsReducer';
import * as Actions from '../reducers/actions/productsActions';

export const ProductsContext = createContext(null);

const STORAGE_KEY = 'products';

const initProducts = (initialProducts) => {
  const products = JSON.parse(sessionStorage.getItem(STORAGE_KEY));
  return products ?? initialProducts;
};

export const ProductsProvider = ({ children }) => {
  const [products, dispatch] = useReducer(
    productsReducer,
    initialProducts,
    initProducts
  );

  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  }, [products]);

  const addProduct = useCallback((productInfo) => {
    dispatch(Actions.addProduct(productInfo));
  }, []);

  const updateProduct = useCallback(
    (product) => dispatch(Actions.updateProduct(product)),
    []
  );

  const editProduct = useCallback((productId, fieldName, fieldValue) => {
    dispatch(Actions.editProduct(productId, fieldName, fieldValue));
  }, []);

  const deleteProduct = useCallback(
    (productId) => dispatch(Actions.deleteProduct(productId)),
    []
  );

  const resetProducts = useCallback(
    () => dispatch(Actions.resetProducts()),
    []
  );

  const contextValue = {
    products,
    addProduct,
    updateProduct,
    editProduct,
    deleteProduct,
    resetProducts,
  };

  return (
    <ProductsContext.Provider value={contextValue}>
      {children}
    </ProductsContext.Provider>
  );
};
