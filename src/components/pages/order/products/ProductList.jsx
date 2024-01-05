import styled from 'styled-components';

import EmptyList from './EmptyList';
import Loader from '../../../common/Loader';
import ProductCard from './ProductCard';
import { useAdmin } from '../../../../hooks/useAdmin';
import { useProducts } from '../../../../hooks/useProducts';
import { notifySuccess } from '../../../../utilities/notifications';
import { theme } from '../../../../themes';
import { isEmpty } from '../../../../utilities/checks';

export default function ProductList() {
  const { products, deleteProduct } = useProducts();
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

  const handleSelect = (productId) => {
    // Allow product selection on click only in admin mode
    if (!isAdminMode) return;

    if (!isPanelExpanded) expandPanel();
    if (activeTabId !== 1) selectActiveTab(1);
    if (
      !hasProductSelected ||
      (hasProductSelected && selectedProductId !== productId)
    )
      selectProduct(productId);
  };

  const handleDelete = (productId) => {
    deleteProduct(productId);
    if (productId === selectedProductId) selectProduct(null);
    const productTitle =
      products.find((p) => p.id === productId).title || 'Product';
    notifySuccess(`${productTitle} deleted!`);
  };

  const handleDeselect = () => {
    if (!isAdminMode) return;
    if (hasProductSelected) deselectProduct();
  };

  if (!hasProducts)
    return (
      <ProductListStyled>
        <Loader message="Loading products..." className="loader" />
      </ProductListStyled>
    );

  if (hasProducts && isListEmpty) return <EmptyList />;

  return (
    <ProductListStyled onClick={handleDeselect} className={sectionClassName}>
      <div className="container">
        {products.map((p) => (
          <ProductCard
            key={p.id}
            product={p}
            isClickable={isAdminMode}
            isSelected={p.id === selectedProductId && isAdminMode}
            showDeleteButton={isAdminMode}
            onSelect={handleSelect}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </ProductListStyled>
  );
}

/* __________________________________________________________________________ *\
 ** Style
/* __________________________________________________________________________ */
const { breakpoints, spacing } = theme;

const ProductListStyled = styled.section`
  height: 100%;
  padding: ${spacing.sm};
  cursor: default;
  overflow: auto;
  cursor: ${(props) =>
    (props.className ?? '').includes('is--clickable') ? 'pointer' : 'default'};

  .loader {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: ${spacing.xs};
  }

  .container {
    display: grid;
    grid-template-columns: minmax(240px, 1fr);
    justify-items: center;
    row-gap: ${spacing.sm};
  }

  @media screen and (min-width: ${breakpoints.sm}) {
    min-height: auto;
    .container {
      grid-template-columns: repeat(auto-fill, 240px);
      justify-content: center;
      place-items: center;
      column-gap: ${spacing.sm};
      row-gap: ${spacing.xl};
    }
  }

  @media screen and (min-width: ${breakpoints['xl']}) {
    padding: ${spacing['2xl']} ${spacing.xl};
    .container {
      column-gap: 85px;
      row-gap: 60px;
    }
  }
`;
