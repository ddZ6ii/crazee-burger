import styled from 'styled-components';

import { useProducts } from '../../../hooks/useProducts';
import Product from './Product';
import { theme } from '../../../themes';
import EmptyList from './EmptyList';

export default function ProductList() {
  const { products } = useProducts();

  const isListEmpty = products.length === 0;

  return (
    <ProductListStyled>
      {!isListEmpty ? (
        <div className="container">
          {products.map((p) => (
            <Product key={p.id} product={p} />
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
