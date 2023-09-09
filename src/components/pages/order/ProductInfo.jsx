import styled from 'styled-components';

import Button from '../../common/Button';

import { formatPrice } from '../../../utilities/maths';
import { theme } from '../../../themes';

export default function ProductInfo({ title, price }) {
  const formattedPrice = formatPrice(price);

  return (
    <ProductInfoStyled>
      <h2>{title}</h2>

      <div className="menuItem__container">
        <span className="menuItem__price">{formattedPrice}</span>
        <Button label="Add" className="menuItem__btn" />
      </div>
    </ProductInfoStyled>
  );
}

/* __________________________________________________________________________ *\
 ** Style
/* __________________________________________________________________________ */
const { colors, fonts, spacing } = theme;

const ProductInfoStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.sm};

  h2 {
    font-size: 36px;
    text-align: center;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  .menuItem__container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .menuItem__price {
    color: ${colors.accent};
    font-size: ${fonts.size.xl};
    font-weight: ${fonts.weight.regular};
  }

  .menuItem__btn {
    padding: ${spacing.xs} ${spacing.md};
    width: fit-content;

    background-color: ${colors.accent};

    font-size: ${fonts.size.sm};
    font-weight: ${fonts.weight.bold};
    transition: 0.3s ease;

    &:hover,
    &:focus {
      background-color: transparent;
      border-color: ${colors.accent};
      color: ${colors.accent};
    }

    &:active {
      background-color: ${colors.accent};
      color: ${colors.white};
    }
  }
`;
