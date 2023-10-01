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

      <div className="productContainer">
        <h2 className="product__title">{product.title}</h2>

        <div className="product__info">
          <span className="product__price">{formattedPrice}</span>
          <Button label="Add" className="product__cta" />
        </div>
      </div>
    </ProductStyled>
  );
}

/* __________________________________________________________________________ *\
 ** Style
/* __________________________________________________________________________ */
const { borderRadius, breakpoints, colors, fonts, shadows, spacing } = theme;

const ProductStyled = styled.div`
  padding: ${spacing.sm};
  width: 220px;
  height: 265px;

  display: grid;
  grid-template-rows: 55% 1fr;
  row-gap: ${spacing['2xs']};

  background-color: ${colors.white};
  border-radius: ${borderRadius.rounded_lg};
  box-shadow: ${shadows.md};

  .product__thumbnailContainer {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .product__thumbnail {
    max-width: 100%;
    max-height: 100%;
  }

  .productContainer {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .product__title {
    font-size: ${fonts.size['2xl']};
    text-align: center;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  .product__info {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .product__price {
    color: ${colors.accent};
    font-size: ${fonts.size.lg};
    font-weight: ${fonts.weight.regular};
  }

  .product__cta {
    padding: ${spacing.xs} ${spacing.md};
    width: fit-content;

    background-color: ${colors.accent};

    font-size: ${fonts.size.xs};
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

  @media screen and (min-width: ${breakpoints.xl}) {
    width: 240px;
    min-height: 330px;
    gap: ${spacing.xs};
    border-radius: ${borderRadius.rounded_2xl};

    .product__thumbnailContainer {
      height: 145px;
    }

    .product__title {
      font-size: 36px;
    }

    .product__price {
      font-size: ${fonts.size.xl};
    }

    .product__cta {
      font-size: ${fonts.size.sm};
    }
  }

  /* @media screen and (orientation: landscape) and (max-width: ${breakpoints.lg}) {
    min-height: 300px;
    padding: ${spacing.xs} ${spacing.sm};
  } */
`;
