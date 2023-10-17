import { useCallback, useContext, useEffect, useReducer } from 'react';
import { ProductsContext } from '../contexts/ProductsContext';
import { productsReducer } from '../store/reducers/ProductsReducer';
import * as Actions from '../store/actions/productsActions';
import { LARGE as initialProducts } from '../data/fakeMenus';

const STORAGE_KEY = 'products';

const initProducts = (initialProducts) => {
  const products = JSON.parse(sessionStorage.getItem(STORAGE_KEY));
  return products ?? initialProducts;
};

// to be passed as the value for the context provider
export const useProductsStore = () => {
  const [products, dispatch] = useReducer(
    productsReducer,
    initialProducts,
    initProducts
  );

  const addProduct = useCallback(
    (product) => dispatch(Actions.addProduct(product)),
    []
  );

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

  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  }, [products]);

  return {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    resetProducts,
  };
};

// custom hook to be used by context consumers
export const useProducts = () => useContext(ProductsContext);
