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
const NAVBAR_HEIGHT_MOBILE = '95px';
const { breakpoints, spacing } = theme;

const ProductListStyled = styled.div`
  padding: ${spacing.md};
  min-height: calc(100dvh - ${NAVBAR_HEIGHT_MOBILE});

  display: grid;
  grid-template-columns: minmax(240px, 1fr);
  justify-items: center;
  row-gap: ${spacing.md};
  overflow-y: scroll;

  @media screen and (min-width: ${breakpoints.sm}) {
    padding: ${spacing['2xl']} ${spacing['xl']};
    min-height: auto;

    grid-template-columns: repeat(auto-fill, 240px);
    justify-content: center;
    column-gap: clamp(20px, 6vw, 85px);
    row-gap: clamp(20px, 6vw, 85px);
  }
  @media screen and (min-width: ${breakpoints.lg}) {
    column-gap: 85px;
    row-gap: 60px;
  }
  @media screen and (max-width: ${breakpoints.lg}) and (orientation: landscape) {
    padding: ${spacing.sm};
  }

  .spinnerContainer {
    display: flex;
    align-items: center;
    gap: ${spacing['2xs']};
  }
`;
