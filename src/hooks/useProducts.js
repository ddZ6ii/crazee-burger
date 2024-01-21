import { useContext } from 'react';
import { ProductsContext } from '../contexts/ProductsContext';

export const useProducts = () => {
  const products = useContext(ProductsContext);
  if (products === null)
    throw Error('useProducts was used outside its ProductsContext provider');
  return products;
};
