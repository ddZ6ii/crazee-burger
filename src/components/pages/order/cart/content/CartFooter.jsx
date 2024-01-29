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
const { breakpoints, colors, spacing } = theme;

const PADDING = {
  mobile: `${spacing['2xs']} ${spacing.md}`,
  desktop: `${spacing['2xs']} ${spacing.sm}`,
};

const CartFooterStyled = styled.div`
  padding: ${PADDING.mobile};
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${colors.neutral_darkest};
  color: ${colors.accent};

  @media screen and (min-width: ${breakpoints.md}) {
    padding: ${PADDING.desktop};
  }

  @media screen and (orientation: landscape) and (max-width: ${breakpoints.lg}) {
    padding: ${PADDING.mobile};
  }
`;
