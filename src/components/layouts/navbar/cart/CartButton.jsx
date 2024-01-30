import styled from 'styled-components';
import { PiShoppingCartSimpleBold } from 'react-icons/pi';

import Button from '../../../common/Button';
import { theme } from '../../../../themes';
import { isEmpty } from '../../../../utilities/checks';

export default function CartButton({ cartItems, showCart, onCartToggle }) {
  const showTag = !isEmpty(cartItems) && Number(cartItems) !== 0;
  const tag = cartItems > 9 ? '+9' : cartItems.toString();

  return (
    <ContainerStyled $showCart={showCart}>
      <Button
        Icon={<PiShoppingCartSimpleBold className="btn__icon" />}
        label="View Order"
        className="cart__btn"
        onClick={onCartToggle}
      >
        {showTag && <div className="cart_tag">{tag}</div>}
      </Button>
    </ContainerStyled>
  );
}

/* __________________________________________________________________________ *\
 ** Style
/* __________________________________________________________________________ */
const { borderRadius, breakpoints, colors, fonts, spacing } = theme;

const ContainerStyled = styled.div`
  position: relative;

  color: ${(props) => (props.$showCart ? colors.accent : colors.neutral_light)};
  font-size: ${fonts.size.sm};

  .cart__btn {
    padding: 0;

    flex-flow: column-reverse;
    align-items: center;
    justify-content: space-between;

    border: none;

    font-family: ${fonts.family.body};
    font-size: ${fonts.size.sm};
    font-weight: ${fonts.weight.regular};
    stroke-width: 4px;

    .btn__icon {
      font-size: ${fonts.size.xl};
    }
    .btn__label {
      display: none;
    }
  }

  .cart_tag {
    position: absolute;
    top: -4px;
    right: -4px;

    width: 16px;
    height: 16px;

    display: flex;
    justify-content: center;
    align-items: center;

    background-color: ${colors.status.info};
    border-radius: ${borderRadius.rounded_full};

    color: ${colors.neutral_lightest};
    font-size: ${fonts.size['2xs']};
  }

  @media screen and (min-width: ${breakpoints.md}) {
    .cart__btn {
      gap: ${spacing['3xs']};
      .btn__icon {
        font-size: ${fonts.size.md};
      }
      .btn__label {
        display: block;
      }
    }

    .cart_tag {
      top: -4px;
      right: 12px;
      width: 14px;
      height: 14px;
      font-size: ${fonts.size['3xs']};
    }
  }

  @media screen and (orientation: landscape) and (max-width: ${breakpoints.lg}) {
    .cart__btn {
      .btn__label {
        display: none;
      }
      .btn__icon {
        font-size: ${fonts.size.xl};
      }
    }
    .cart_tag {
      top: -4px;
      right: -4px;
    }
  }
`;
