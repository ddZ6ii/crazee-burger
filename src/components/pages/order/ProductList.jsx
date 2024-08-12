import { useEffect, useRef } from 'react';
import styled from 'styled-components';

import EmptyList from './products/EmptyList';
import Loader from '../../common/Loader';
import ProductCard from './products/ProductCard';
import { useAdmin } from '../../../hooks/useAdmin';
import { useCart } from '../../../hooks/useCart';
import { useProducts } from '../../../hooks/useProducts';
import { isEmpty } from '../../../utilities/checks';
import { notifySuccess } from '../../../utilities/notifications';
import { theme } from '../../../themes';

const SCROLL_SETTINGS = {
  behavior: 'smooth',
  block: 'center',
  inline: 'center',
};

export default function ProductList() {
  const cardsRef = useRef(null);
  const { products, deleteProduct } = useProducts();
  const { addToCart, deleteFromCart } = useCart();
  const {
    activeTabId,
    isAdminMode,
    isPanelExpanded,
    selectedProductId,
    expandPanel,
    selectProduct,
    selectActiveTab,
    deselectProduct,
  } = useAdmin();

  const hasProducts = products !== null && products !== undefined;
  const hasProductSelected = !isEmpty(selectedProductId);
  const isListEmpty = products && products.length === 0;
  const sectionClassName =
    hasProductSelected && isAdminMode ? 'is--clickable' : '';

  const checkIsProductSelected = (productId) =>
    productId === selectedProductId && isAdminMode;

  const getCardRef = (productId) => cardsRef.current.get(productId);

  const getRefMap = () => {
    // Initialize the Map on first usage
    if (!cardsRef.current) cardsRef.current = new Map();
    return cardsRef.current;
  };

  const refCallback = (node, productId) => {
    const map = getRefMap();
    if (node) map.set(productId, node);
    else map.delete(productId);
  };

  const handleSelect = (e, productId) => {
    e.stopPropagation();

    // Allow product selection on click only in admin mode
    if (!isAdminMode) return;

    if (!isPanelExpanded) expandPanel();
    if (activeTabId !== 1) selectActiveTab(1);

    const isNewSelection =
      !hasProductSelected ||
      (hasProductSelected && productId !== selectedProductId);

    if (isNewSelection) selectProduct(productId);
  };

  const handleDeselect = () => {
    if (!isAdminMode) return;
    if (hasProductSelected) deselectProduct();
  };

  const handleAdd = (e, productId) => {
    e.stopPropagation();
    addToCart(productId);
  };

  const handleDelete = (e, productId) => {
    e.stopPropagation();
    deleteFromCart(productId);
    deleteProduct(productId);
    if (productId === selectedProductId) selectProduct(null);
    const productTitle =
      products.find((p) => p.id === productId).title || 'Product';
    notifySuccess(`${productTitle} deleted!`);
  };

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

  if (!hasProducts)
    return (
      <SectionStyled>
        <Loader message="Loading products..." className="loader" />
      </SectionStyled>
    );

  if (hasProducts && isListEmpty) return <EmptyList />;

  return (
    <SectionStyled
      onClick={handleDeselect}
      className={sectionClassName}
      $isAdminMode={isAdminMode}
    >
      {/* additional div container to leave some top & bottom gap within the scrolling container */}
      <ProductListStyled>
        {products.map((p) => (
          <ProductCard
            key={p.id}
            ref={(node) => refCallback(node, p.id)}
            product={p}
            showDeleteButton={isAdminMode}
            isClickable={isAdminMode}
            isSelected={checkIsProductSelected(p.id)}
            onSelect={(e) => handleSelect(e, p.id)}
            onAdd={(e) => handleAdd(e, p.id)}
            onDelete={(e) => handleDelete(e, p.id)}
          />
        ))}
      </ProductListStyled>
    </SectionStyled>
  );
}

/* __________________________________________________________________________ *\
 ** Style
/* __________________________________________________________________________ */
const { breakpoints, shadows, spacing } = theme;

const SectionStyled = styled.section`
  padding: ${spacing['2xs']} ${spacing.sm};
  max-height: 100%;
  box-shadow: ${shadows.xl};
  overflow: hidden;

  .loader {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: ${spacing.xs};
  }
`;

const ProductListStyled = styled.ul`
  padding: ${spacing['sm']} 0;
  padding-bottom: ${(props) =>
    props.$isAdminMode ? spacing['2xl'] : spacing['sm']};

  height: fit-content;
  max-height: 100%;

  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  grid-auto-rows: min-content;
  justify-items: center;
  gap: ${spacing.sm};

  overflow-y: auto;

  cursor: ${(props) =>
    (props.className ?? '').includes('is--clickable') ? 'pointer' : 'default'};

  @media screen and (min-width: ${breakpoints.sm}) {
    row-gap: ${spacing.xl};
  }

  @media screen and (min-width: ${breakpoints['xl']}) {
    padding: ${spacing.xl};
  }
`;
