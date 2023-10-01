import { useEffect, useState } from 'react';
import styled from 'styled-components';

import LoadingSpinner from '../../common/LoadingSpinner';
import Product from './Product';

import { fakeMenu2 as products } from '../../../data/fakeMenus';
import { theme } from '../../../themes';

export default function ProductList() {
  const [menus, setMenus] = useState([]);

  useEffect(() => {
    setMenus(products);
  }, []);

  return (
    <ProductListStyled>
      {menus.length ? (
        menus.map((product) => <Product key={product.id} product={product} />)
      ) : (
        <LoadingSpinner
          message="Loading menus..."
          className="spinnerContainer"
          spinnerSize={40}
        />
      )}
    </ProductListStyled>
  );
}

/* __________________________________________________________________________ *\
 ** Style
/* __________________________________________________________________________ */
const { breakpoints, spacing } = theme;

const ProductListStyled = styled.section`
  padding: ${spacing.sm};

  display: grid;
  grid-template-columns: minmax(240px, 1fr);
  justify-items: center;
  row-gap: ${spacing.sm};
  overflow: auto;

  .spinnerContainer {
    display: flex;
    align-items: center;
    gap: ${spacing['2xs']};
  }

  @media screen and (min-width: ${breakpoints.sm}) {
    min-height: auto;

    grid-template-columns: repeat(auto-fill, 240px);
    justify-content: center;
    place-items: center;
    column-gap: ${spacing.sm};
    row-gap: ${spacing.xl};
  }

  @media screen and (min-width: ${breakpoints['xl']}) {
    padding: ${spacing['2xl']} ${spacing.xl};
    column-gap: 85px;
    row-gap: 60px;
  }
`;
