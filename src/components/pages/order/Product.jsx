import { useMemo } from 'react';
import styled from 'styled-components';

import Button from '../../common/Button';

import { formatPrice } from '../../../utilities/maths';
import { theme } from '../../../themes';

export default function Product({ product }) {
  const formattedPrice = useMemo(
    () => formatPrice(product.price),
    [product.price]
  );

  return (
    <ProductStyled>
      <div className="product__thumbnailContainer">
        <img
          src={product.imageSource}
          alt={product.title}
          className="product__thumbnail"
        />
      </div>

      <div className="product__info">
        <h2 className="info__title">{product.title}</h2>
        <div className="info__container">
          <span className="info__price">{formattedPrice}</span>
          <Button label="Add" className="info__cta" />
        </div>
      </div>
    </ProductStyled>
  );
}

/* __________________________________________________________________________ *\
 ** Style
/* __________________________________________________________________________ */
const { borderRadius, colors, fonts, spacing } = theme;

const ProductStyled = styled.div`
  padding: ${spacing.sm};
  width: 240px;
  min-height: 330px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: ${spacing.xs};

  background-color: ${colors.white};
  border-radius: ${borderRadius.rounded_2xl};
  box-shadow: 0px 8px 20px 8px rgba(0, 0, 0, 0.1);

  .product__thumbnailContainer {
    height: 145px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .product__thumbnail {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .product__info {
    display: flex;
    flex-direction: column;
    gap: ${spacing.sm};
  }

  .info__title {
    font-size: 36px;
    text-align: center;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  .info__container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .info__price {
    color: ${colors.accent};
    font-size: ${fonts.size.xl};
    font-weight: ${fonts.weight.regular};
  }

  .info__cta {
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
