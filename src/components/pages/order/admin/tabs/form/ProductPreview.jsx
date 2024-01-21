import styled from 'styled-components';

import { theme } from '../../../../../../themes';

export default function ProductPreview({
  imageUrl,
  showPreview = true,
  className,
}) {
  const tooltip = showPreview ? '' : 'Add an image URL first to see a preview';
  return (
    <PreviewStyled className={className} title={tooltip}>
      {showPreview ? (
        <img src={imageUrl} alt="product thumbnail" className="thumbnail" />
      ) : (
        <span>No preview available</span>
      )}
    </PreviewStyled>
  );
}

/* __________________________________________________________________________ *\
 ** Style
/* __________________________________________________________________________ */
const { borderRadius, colors } = theme;

const PreviewStyled = styled.div`
  width: 215px;
  max-height: 136px;

  display: flex;
  justify-content: center;
  align-items: center;

  outline: 1px solid ${colors.neutral_light};
  border-radius: ${borderRadius.rounded};

  text-align: center;

  &:has(img) {
    outline-color: transparent;
  }

  .thumbnail {
    max-width: 100%;
    max-height: 100%;
  }
`;
