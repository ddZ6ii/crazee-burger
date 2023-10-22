import styled from 'styled-components';
import { TiDelete } from 'react-icons/ti';

import Button from '../../common/Button';

import { formatPrice } from '../../../utilities/maths';
import { theme } from '../../../themes';

export default function ProductCard({ product, showDeleteButton, onDelete }) {
  const formattedPrice = formatPrice(product.price);

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
          <Button label="Add" className="product__btn-add" />
        </div>
      </div>

      {showDeleteButton && (
        <Button
          aria-label="delete-product"
          Icon={<TiDelete />}
          className="product__btn-delete"
          onClick={() => onDelete(product.id)}
        />
      )}
    </ProductStyled>
  );
}

/* __________________________________________________________________________ *\
 ** Style
/* __________________________________________________________________________ */
const { borderRadius, breakpoints, colors, fonts, shadows, spacing } = theme;

const ProductStyled = styled.div`
  position: relative;

  padding: ${spacing.sm};
  width: 220px;
  height: 265px;

  display: grid;
  grid-template-rows: 55% 1fr;
  row-gap: ${spacing['2xs']};

  background-color: ${colors.white};
  border-radius: ${borderRadius.rounded_lg};
  box-shadow: ${shadows.base};
  outline: 2px solid transparent;

  transition-duration: 0.3s;
  transition-timing-function: ease-in-out;
  transition-property: outline-color, box-shadow;

  &:hover {
    box-shadow: ${shadows.md};
  }
  &:has(.product__btn-delete:hover) {
    outline-color: ${colors.info_danger};
    animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97);
  }
  @keyframes shake {
    10%,
    90% {
      transform: translate3d(-1px, 0, 0);
    }

    20%,
    80% {
      transform: translate3d(2px, 0, 0);
    }

    30%,
    50%,
    70% {
      transform: translate3d(-4px, 0, 0);
    }

    40%,
    60% {
      transform: translate3d(4px, 0, 0);
    }
  }

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

  .product__btn-add {
    padding: ${spacing.xs} ${spacing.md};
    width: fit-content;

    background-color: ${colors.accent};
    outline: 2px solid transparent;

    font-size: ${fonts.size.xs};
    font-weight: ${fonts.weight.bold};
    transition: 0.3s ease;

    &:hover,
    &:focus {
      background-color: transparent;
      outline-color: ${colors.accent};
      color: ${colors.accent};
    }
    &:active {
      background-color: ${colors.accent};
      color: ${colors.white};
    }
  }

  .product__btn-delete {
    position: absolute;
    top: ${spacing['2xs']};
    right: ${spacing['2xs']};

    padding: ${spacing['4xs']};
    width: fit-content;
    gap: 0;

    background: none;
    border: 0;

    color: ${colors.neutral_darkest};
    cursor: pointer;
    font-size: ${fonts.size['xl']};

    &:hover {
      color: ${colors.info_danger};
    }
    &:focus {
      color: ${colors.info_danger};
      outline-color: ${colors.info_danger};
    }
  }

  @media screen and (min-width: ${breakpoints.md}) {
    .product__btn-add {
      font-size: ${fonts.size.sm};
    }
    .product__price {
      font-size: 22px;
    }
  }

  @media screen and (min-width: ${breakpoints.xl}) {
    width: 240px;
    min-height: 300px;
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
    .product__btn-add {
      font-size: ${fonts.size.sm};
    }
  }

  @media screen and (orientation: landscape) and (max-width: ${breakpoints.lg}) {
    .product__btn-add {
      font-size: ${fonts.size.xs};
    }
    .product__price {
      font-size: ${fonts.size.lg};
    }
  }
`;
