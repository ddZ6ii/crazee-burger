import styled from 'styled-components';

import CartContent from './content/CartContent';
import CartFooter from './content/CartFooter';
import CartHeader from './content/CartHeader';
import { useCart } from '../../../../hooks/useCart';
import { theme } from '../../../../themes';
import { useProducts } from '../../../../hooks/useProducts';

export default function Cart({ className }) {
  const { cart, toggleCart, getTotalPrice } = useCart();
  const { products } = useProducts();

  return (
    <CartLayout className={className}>
      <CartHeader onCartClose={toggleCart} />
      <hr />
      <CartContent className="cart__content" />
      <CartFooter amount={getTotalPrice(cart.items, products)} />
    </CartLayout>
  );
}

/* __________________________________________________________________________ *\
 ** Style
/* __________________________________________________________________________ */
const { breakpoints, colors, fonts, spacing } = theme;

const PADDING = {
  mobile: `${spacing['2xs']} ${spacing.md}`,
  desktop: `${spacing['2xs']} ${spacing.sm}`,
};

const CartLayout = styled.aside`
  display: flex;
  flex-direction: column;

  background-color: ${colors.white};
  box-shadow: 0px 8px 12px 0px rgba(0, 0, 0, 0.2) inset;

  color: ${colors.neutral};
  font-size: ${fonts.size['xl']};
  font-family: ${fonts.family.headings};

  .cart__content {
    padding: ${PADDING.mobile};
    flex-grow: 1;
    font-size: ${fonts.size['xl']};
  }

  /* Overwrite default styling with class passed in by parent (if any) */
  ${(props) => props.className}

  @media screen and (min-width: ${breakpoints.md}) {
    .cart__content {
      padding: ${PADDING.desktop};
    }
  }

  @media screen and (min-width: ${breakpoints.xl}) {
    font-size: ${fonts.size['2xl']};
    .cart__content {
      font-size: ${fonts.size['2xl']};
    }
  }

  @media screen and (orientation: landscape) and (max-width: ${breakpoints.lg}) {
    border-radius: 0;
    font-size: ${fonts.size['xl']};
    .cart__content {
      padding: ${PADDING.mobile};
      font-size: inherit;
    }
  }
`;
