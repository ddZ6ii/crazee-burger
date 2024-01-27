import styled from 'styled-components';

import AdminPanel from './order/AdminPanel';
import Cart from './order/cart/Cart';
import ProductList from './order/ProductList';
import { AddProductProvider } from '../../contexts/AddProductContext';
import { useAdmin } from '../../hooks/useAdmin';
import { theme } from '../../themes';

export default function OrderPage() {
  const { isAdminMode } = useAdmin();

  return (
    <OrderPageLayout>
      {/* {true && <Cart />} */}
      <ProductList />
      {/* Hold the state for the AddProduct to retain product info when switching tabs in the admin panel  */}
      <AddProductProvider>{isAdminMode && <AdminPanel />}</AddProductProvider>
    </OrderPageLayout>
  );
}

/* __________________________________________________________________________ *\
 ** Style
/* __________________________________________________________________________ */
const { breakpoints, colors } = theme;

const OrderPageLayout = styled.div`
  position: relative;
  /* min-height: 100%; */
  height: 100%;

  display: grid;
  /* grid-template-columns: 1fr 2fr; */
  grid-template-columns: 1fr;

  background-color: ${colors.neutral_lightest};

  @media screen and (min-width: ${breakpoints.md}) {
    /* height: 100%; */
    grid-template-columns: 1fr;
    /* grid-template-columns: 1fr 2fr; */
    /* grid-template-columns: 1fr 3fr; */
    grid-template-rows: 1fr auto;
  }

  @media screen and (min-width: ${breakpoints.lg}) {
    grid-template-columns: 1fr;
    /* grid-template-columns: 1fr 3fr; */
  }

  @media screen and (orientation: landscape) and (max-width: ${breakpoints.lg}) {
    border-radius: 0;
    grid-template-columns: 1fr;
    /* grid-template-columns: 1fr 2fr; */
  }
`;
