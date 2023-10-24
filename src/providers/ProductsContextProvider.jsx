import { ProductsContext } from '../contexts/ProductsContext';
import { useProductsStore } from '../hooks/useProducts';

export default function ProductsContextProvider({ children }) {
  return (
    <ProductsContext.Provider value={useProductsStore()}>
      {children}
    </ProductsContext.Provider>
  );
}
