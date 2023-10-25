import { useContext } from 'react';
import { ProductFormContext } from '../contexts/ProductFormContext';

export const useProductForm = () => {
  const productInfo = useContext(ProductFormContext);
  if (productInfo === null)
    throw Error(
      'useProductForm was used outside its ProductFormContext provider'
    );
  return productInfo;
};
