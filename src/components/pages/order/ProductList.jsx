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
import useProductCardRef from '../../../hooks/useProductCardRef';

export default function ProductList() {
  const { products, deleteProduct } = useProducts();
  const { addToCart, deleteFromCart } = useCart();
  const { refCallback } = useProductCardRef();
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
  const isProductSelected = (productId) =>
    productId === selectedProductId && isAdminMode;

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
            isSelected={isProductSelected(p.id)}
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
