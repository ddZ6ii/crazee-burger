import styled from 'styled-components';

import { useProductForm } from '../../../../hooks/useProductForm';
import { isEmpty } from '../../../../utilities/checks';
import { theme } from '../../../../themes';

export default function ProductPreview({ className }) {
  const { form, hasError } = useProductForm();
  const url = form.data?.imageSource;
  const showThumbnail = !hasError() && !isEmpty(url);

  return (
    <PreviewStyled className={className}>
      {showThumbnail ? (
        <img src={url} alt="product thumbnail" className="thumbnail" />
      ) : (
        <span>No product thumbnail</span>
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
