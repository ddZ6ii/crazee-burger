import { createContext, useCallback, useEffect, useState } from 'react';
import { PRODUCT as EMPTY_PRODUCT } from '../enums/product';

export const AddProductContext = createContext(null);

const STORAGE_KEY = 'addProductInfo';

const initProduct = () => {
  const product = JSON.parse(sessionStorage.getItem(STORAGE_KEY));
  return product ?? { ...EMPTY_PRODUCT, price: '', imageSource: '' };
};

export const AddProductProvider = ({ children }) => {
  const [product, setProduct] = useState(initProduct);

  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(product));
    return () => {
      sessionStorage.removeItem(STORAGE_KEY);
    };
  }, [product]);

  const updateProduct = useCallback(
    (name, value) => setProduct((prevInfo) => ({ ...prevInfo, [name]: value })),
    []
  );

  // const resetProduct = useCallback(() => setProduct(EMPTY_PRODUCT), []);
  const resetProduct = useCallback(
    () => setProduct({ ...EMPTY_PRODUCT, price: '', imageSource: '' }),
    []
  );

  const contextValue = {
    product,
    updateProduct,
    resetProduct,
  };

  return (
    <AddProductContext.Provider value={contextValue}>
      {children}
    </AddProductContext.Provider>
  );
};
