import { useCallback, useEffect, useRef } from 'react';
import { useAdmin } from './useAdmin';
import { isEmpty } from '../utilities/checks';
import { useProducts } from './useProducts';

const SCROLL_SETTINGS = {
  behavior: 'smooth',
  block: 'center',
  inline: 'center',
};

export default function useProductCardRef() {
  const cardsRef = useRef(null);
  const { products } = useProducts();
  const { activeTabId, isAdminMode, selectedProductId } = useAdmin();

  const getCardRef = (productId) => cardsRef.current.get(productId);

  const getRefMap = () => {
    // Initialize the Map on first usage
    if (!cardsRef.current) cardsRef.current = new Map();
    return cardsRef.current;
  };

  const refCallback = useCallback((node, productId) => {
    const map = getRefMap();
    if (node) map.set(productId, node);
    else map.delete(productId);
  }, []);

  // Center view on lastly added or currently selected product
  useEffect(() => {
    if (!isAdminMode) return;
    if (isEmpty(products)) return;

    const scrollViewToProduct = (productId) => {
      if (isEmpty(productId)) return;
      const node = getCardRef(productId);
      node.scrollIntoView(SCROLL_SETTINGS);
    };

    let productToCenterViewOn;
    // If AddProduct panel is active, center view on lastly added product
    if (activeTabId === 0) {
      productToCenterViewOn = products[0].id;
    }
    // If EditProduct panel is active, center view on selected product only if any
    else {
      productToCenterViewOn = isEmpty(selectedProductId)
        ? null
        : selectedProductId;
    }

    scrollViewToProduct(productToCenterViewOn);
  }, [isAdminMode, activeTabId, selectedProductId, products]);

  return { refCallback, cardsRef };
}
