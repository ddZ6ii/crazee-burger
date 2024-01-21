import { useContext } from 'react';
import { AddProductContext } from '../contexts/AddProductContext';

export const useAddProduct = () => {
  const productInfo = useContext(AddProductContext);
  if (productInfo === null)
    throw Error(
      'useAddProduct was used outside its AddProductContext provider'
    );
  return productInfo;
};
