import styled from 'styled-components';

import AdminPanel from './order/AdminPanel';
import Cart from './order/cart/Cart';
import ProductList from './order/ProductList';
import { AddProductProvider } from '../../contexts/AddProductContext';
import { useAdmin } from '../../hooks/useAdmin';
import { useCart } from '../../hooks/useCart';
import { theme } from '../../themes';

export default function OrderPage() {
  const { isAdminMode: showAdminPanel } = useAdmin();
  const {
    cart: { showCart },
  } = useCart();

  return (
    <OrderPageLayout $showCart={showCart}>
      {showCart && <Cart className="cart__panel" />}
      <ProductList />
      {/* Hold the state for the AddProduct to retain product info when switching tabs in the admin panel  */}
      <AddProductProvider>
        {showAdminPanel && <AdminPanel className="admin__panel" />}
      </AddProductProvider>
    </OrderPageLayout>
  );
}

/* __________________________________________________________________________ *\
 ** Style
/* __________________________________________________________________________ */
const { breakpoints, colors } = theme;

/* Mobile portrait/landscape && Tablet portrait: the Cart panel is above the ProductList and occupies the whole viewport */
/* Tablet landscape && desktop: the Cart panel is next to the ProductList  */

const OrderPageLayout = styled.div`
  position: relative;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr;
  background-color: ${colors.neutral_lightest};
  .cart__panel {
    position: absolute;
    z-index: 1;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  .admin__panel {
    display: none;
  }

  @media screen and (min-width: ${breakpoints.md}) {
    grid-template-columns: ${(props) =>
      props.$showCart ? '1fr 1.2fr' : '1fr'};
    grid-template-rows: 1fr auto;

    .cart__panel {
      position: relative;
      z-index: 0;
    }
    .admin__panel {
      display: block;
      grid-column: 1 / -1;
    }
  }

  @media screen and (min-width: ${breakpoints.lg}) {
    grid-template-columns: ${(props) =>
      props.$showCart ? '1fr 1.6fr' : '1fr'};
  }

  @media screen and (orientation: landscape) and (max-width: ${breakpoints.lg}) {
    border-radius: 0;
    grid-template-columns: ${(props) => (props.$showCart ? '1fr 1fr' : '1fr')};

    .cart__panel {
      position: relative;
    }
    .admin__panel {
      display: none;
    }
  }

  @media screen and (orientation: landscape) and (min-width: ${breakpoints.lg}) {
    grid-template-columns: ${(props) =>
      props.$showCart ? '1fr 2.6fr' : '1fr'};
    .cart__panel {
      grid-row: 1 / -1;
    }
    .admin__panel {
      grid-column: ${(props) => (props.$showCart ? ' 2 / span 1' : '1 / -1')};
    }
  }
`;
