import styled from 'styled-components';

export default function ProductThumbnail({ src, title }) {
  return (
    <ProductThumbnailStyled>
      <img src={src} alt={title} />
    </ProductThumbnailStyled>
  );
}

/* __________________________________________________________________________ *\
 ** Style
/* __________________________________________________________________________ */
const ProductThumbnailStyled = styled.div`
  height: 145px;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;
