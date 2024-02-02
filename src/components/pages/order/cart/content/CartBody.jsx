import styled from 'styled-components';
import { Fragment } from 'react';

import ItemCard from './body/ItemCard';
import Message from '../../../../common/Message';
import { useProducts } from '../../../../../hooks/useProducts';
import { theme } from '../../../../../themes';
import { isEmpty } from '../../../../../utilities/checks';

export default function CartBody({ cartItems, className }) {
  const { products } = useProducts();

  const emptyCart = isEmpty(cartItems);
  const items = Object.entries(cartItems);
  const itemsCount = items.length - 1;

  const getItemInfo = (productId) => products.find((p) => p.id === productId);

  if (emptyCart)
    return <Message message="Your order is empty" className={className} />;

  return (
    <CartBodyLayout className={className}>
      {items.map(([itemId, qty], index) => (
        <Fragment key={itemId}>
          <ItemCard
            item={getItemInfo(itemId)}
            qty={qty}
            isLastItem={index === itemsCount}
          />
          {index < itemsCount && <hr />}
        </Fragment>
      ))}
    </CartBodyLayout>
  );
}

/* __________________________________________________________________________ *\
 ** Style
/* __________________________________________________________________________ */
const { colors, shadows, spacing } = theme;

const CartBodyLayout = styled.ul`
  box-shadow: ${shadows.lg};
  overflow-y: auto;

  hr {
    margin-bottom: ${spacing.sm};
    border: none;
    border-top: 1px solid ${colors.neutral_light};
  }
`;
