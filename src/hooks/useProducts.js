import { useCallback, useContext, useEffect, useReducer } from 'react';
import { ProductsContext } from '../contexts/ProductsContext';
import {
  productsReducer,
  initialProducts,
} from '../store/reducers/productsReducer';
import * as Actions from '../store/actions/productsActions';

const STORAGE_KEY_PRODUCTS = 'products';
const STORAGE_KEY_NEXT_ID = 'nextId';

let nextId =
  JSON.parse(sessionStorage.getItem(STORAGE_KEY_NEXT_ID)) ??
  initialProducts.length + 1;

const initProducts = (initialProducts) => {
  const products = JSON.parse(sessionStorage.getItem(STORAGE_KEY_PRODUCTS));
  return products ?? initialProducts;
};

// to be passed as the value for the context provider
export const useProductsStore = () => {
  const [products, dispatch] = useReducer(
    productsReducer,
    initialProducts,
    initProducts
  );

  const addProduct = useCallback((product) => {
    dispatch(Actions.addProduct(product, nextId));
    nextId++;
    sessionStorage.setItem(STORAGE_KEY_NEXT_ID, JSON.stringify(nextId));
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

  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY_PRODUCTS, JSON.stringify(products));
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
