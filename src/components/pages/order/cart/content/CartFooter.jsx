import styled from 'styled-components';

import { theme } from '../../../../../themes';
import { formatPrice } from '../../../../../utilities/maths';

export default function CartFooter({ amount }) {
  return (
    <CartFooterStyled>
      <span>Total</span>
      <span>{formatPrice(amount)}</span>
    </CartFooterStyled>
  );
}

/* __________________________________________________________________________ *\
 ** Style
/* __________________________________________________________________________ */
const { colors, fonts, spacing } = theme;

const CartFooterStyled = styled.div`
  padding: ${spacing['2xs']} ${spacing.sm};
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${colors.neutral_darkest};
  color: ${colors.accent};
  font-size: ${fonts.size['2xl']};
`;
