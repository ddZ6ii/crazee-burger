import styled from 'styled-components';

import ProductInfo from './ProductInfo';
import ProductThumbnail from './ProductThumbnail';

import { theme } from '../../../themes';

export default function Product({ product }) {
  return (
    <ProductStyled>
      <ProductThumbnail src={product.imageSource} title={product.price} />
      <ProductInfo price={product.price} title={product.title} />
    </ProductStyled>
  );
}

/* __________________________________________________________________________ *\
 ** Style
/* __________________________________________________________________________ */
const { borderRadius, colors, spacing } = theme;

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
`;
