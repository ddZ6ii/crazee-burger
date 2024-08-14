import styled from 'styled-components';
import { IoMdCloseCircle } from 'react-icons/io';

import CartBody from './content/CartBody';
import CartFooter from './content/CartFooter';
import CloseCartButton from '../../../common/Button';
import { useCart } from '../../../../hooks/useCart';
import { useProducts } from '../../../../hooks/useProducts';
import { theme } from '../../../../themes';

export default function Cart({ className }) {
  const { cart, toggleCart, getTotalPrice } = useCart();
  const { products } = useProducts();

  return (
    <CartContainer className={className}>
      <CloseCartButton
        Icon={<IoMdCloseCircle />}
        title="Close cart"
        className="header__btn"
        onClick={toggleCart}
      />

      <CartBody cartItems={cart.items} className="cart__body" />

      <CartFooter amount={getTotalPrice(cart.items, products)} />
    </CartContainer>
  );
}

/* __________________________________________________________________________ *\
 ** Style
/* __________________________________________________________________________ */
const { breakpoints, colors, fonts, spacing } = theme;

const CartContainer = styled.aside`
  position: relative;

  display: flex;
  flex-direction: column;

  background-color: ${colors.white};
  box-shadow: 0px 8px 12px 0px rgba(0, 0, 0, 0.2) inset;

  color: ${colors.neutral};
  font-family: ${fonts.family.headings};

  .header__btn {
    position: absolute;
    top: ${spacing['2xs']};
    left: ${spacing.xs};

    padding: 0;
    color: ${colors.neutral_darkest};
    font-size: ${fonts.size['xl']};
    transition: all 0.3s ease;
    &:hover {
      transform: rotate(90deg);
    }
  }

  .cart__body {
    padding: ${spacing.xl} ${spacing.sm} ${spacing.sm};
    flex-grow: 1;
    font-size: inherit;
  }

  @media screen and (min-width: ${breakpoints.xl}) {
    font-size: ${fonts.size['2xl']};
  }

  @media screen and (orientation: landscape) and (max-width: ${breakpoints.lg}) {
    border-radius: 0;
    font-size: ${fonts.size['xl']};
  }
`;
