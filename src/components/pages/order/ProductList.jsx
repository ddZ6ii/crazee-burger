import styled from 'styled-components';

import { useAdmin } from '../../../hooks/useAdmin';
import { useProducts } from '../../../hooks/useProducts';
import ProductCard from './ProductCard';
import EmptyList from './EmptyList';
import {
  TOAST_SUCCESS_SETTINGS,
  displayToastNotification,
} from '../../../utilities/notifications';
import { theme } from '../../../themes';

const SUCCESS_DELETE_MESSAGE = 'Product deleted!';

export default function ProductList() {
  const { products, deleteProduct } = useProducts();
  const { isAdminMode } = useAdmin();

  const handleDelete = (productId) => {
    deleteProduct(productId);
    displayToastNotification(SUCCESS_DELETE_MESSAGE, TOAST_SUCCESS_SETTINGS);
  };

  const hasProducts = products.length > 0;

  return (
    <ProductListStyled>
      {hasProducts ? (
        <div className="container">
          {products.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              showDeleteButton={isAdminMode}
              onDelete={handleDelete}
            />
          ))}
        </div>
      ) : (
        <EmptyList />
      )}
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
  overflow: auto;

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
