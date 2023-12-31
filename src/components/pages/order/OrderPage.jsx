import styled from 'styled-components';

import AdminPanel from './admin/AdminPanel';
import ProductList from './products/ProductList';
import { AddProductProvider } from '../../../contexts/AddProductContext';
import { useAdmin } from '../../../hooks/useAdmin';
import { theme } from '../../../themes';

export default function OrderPage() {
  const { isAdminMode } = useAdmin();

  return (
    <OrderPageStyled>
      {/* <aside className="cart">Shopping Cart</aside> */}
      <ProductList />
      {/* Hold the state for the AddProduct to retain product info when switching tabs in the admin panel  */}
      <AddProductProvider>{isAdminMode && <AdminPanel />}</AddProductProvider>
    </OrderPageStyled>
  );
}

/* __________________________________________________________________________ *\
 ** Style
/* __________________________________________________________________________ */
const { breakpoints, borderRadius, colors, shadows } = theme;

const OrderPageStyled = styled.div`
  min-height: 100%;

  display: grid;
  grid-template-columns: 1fr;

  background-color: ${colors.neutral_lightest};
  box-shadow: ${shadows.lg};

  /* .cart {
    background-color: lightblue;
    display: none;

    @media screen and (min-width: ${breakpoints.md}) {
      display: block;
      grid-row: 1 / -1;
    }
  } */

  @media screen and (min-width: ${breakpoints.md}) {
    height: 100%;
    grid-template-rows: 1fr auto;
    border-bottom-left-radius: ${borderRadius.rounded_lg};
    border-bottom-right-radius: ${borderRadius.rounded_lg};
  }

  @media screen and (min-width: ${breakpoints.lg}) {
    border-bottom-left-radius: ${borderRadius.rounded_2xl};
    border-bottom-right-radius: ${borderRadius.rounded_2xl};
  }

  @media screen and (orientation: landscape) and (max-width: ${breakpoints.lg}) {
    border-radius: 0;
  }
`;
