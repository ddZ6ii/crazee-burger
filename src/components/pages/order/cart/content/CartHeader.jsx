import styled from 'styled-components';
import { IoMdCloseCircle } from 'react-icons/io';

import Button from '../../../../common/Button';
import { theme } from '../../../../../themes';

export default function CartHeader() {
  return (
    <CartHeaderStyled>
      <h2 className="header__title">Cart</h2>
      <Button
        Icon={<IoMdCloseCircle />}
        title="Close cart"
        className="header__btn"
      />
    </CartHeaderStyled>
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

const CartHeaderStyled = styled.div`
  padding: ${PADDING.mobile};
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: inherit;

  .header__title {
    font-size: inherit;
  }

  .header__btn {
    padding: 0;
    color: ${colors.accent};
    font-size: ${fonts.size['xl']};
    transition: all 0.3s ease;
    &:hover {
      transform: rotate(90deg);
    }
  }

  @media screen and (min-width: ${breakpoints.md}) {
    padding: ${PADDING.desktop};
  }

  @media screen and (min-width: ${breakpoints.xl}) {
    .header__btn {
      font-size: ${fonts.size['2xl']};
    }
  }

  @media screen and (orientation: landscape) and (max-width: ${breakpoints.lg}) {
    padding: ${PADDING.mobile};
    .header__btn {
      font-size: ${fonts.size.xl};
    }
  }
`;
