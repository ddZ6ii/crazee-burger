import styled from 'styled-components';
import { Fragment } from 'react';

import ItemCard from './body/ItemCard';
import Message from '../../../../common/Message';
import { useAdmin } from '../../../../../hooks/useAdmin';
import { useProducts } from '../../../../../hooks/useProducts';
import { theme } from '../../../../../themes';
import { isEmpty } from '../../../../../utilities/checks';

export default function CartBody({ cartItems, className }) {
  const { products } = useProducts();
  const {
    activeTabId,
    isAdminMode,
    isPanelExpanded,
    selectedProductId,
    expandPanel,
    selectProduct,
    selectActiveTab,
  } = useAdmin();

  const emptyCart = isEmpty(cartItems);
  const itemsCount = cartItems.length - 1;
  const hasProductSelected = !isEmpty(selectedProductId);

  const getItemInfo = (productId) =>
    products.find((product) => product.id === productId);
  const isProductSelected = (productId) =>
    productId === selectedProductId && isAdminMode;

  const handleSelect = (cartItemId) => {
    if (!isAdminMode) return;

    if (!isPanelExpanded) expandPanel();
    if (activeTabId !== 1) selectActiveTab(1);

    const isNewSelection =
      !hasProductSelected ||
      (hasProductSelected && cartItemId !== selectedProductId);

    if (isNewSelection) selectProduct(cartItemId);
  };

  if (emptyCart)
    return <Message message="Your order is empty" className={className} />;

  return (
    <CartBodyLayout className={className}>
      {cartItems.map((cartItem, index) => (
        <Fragment key={cartItem.id}>
          <ItemCard
            item={getItemInfo(cartItem.id)}
            qty={cartItem.qty}
            isLastItem={index === itemsCount}
            isClickable={isAdminMode}
            isSelected={isProductSelected(cartItem.id)}
            onSelect={() => handleSelect(cartItem.id)}
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
