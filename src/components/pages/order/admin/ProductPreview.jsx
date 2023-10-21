import styled from 'styled-components';

import { useForm } from '../../../../hooks/useForm';
import { isEmpty } from '../../../../utilities/checks';
import { theme } from '../../../../themes';

export default function ProductPreview() {
  const { form, hasError } = useForm();
  const url = form.data?.imageSource;
  const showThumbnail = !hasError() && !isEmpty(url);

  return (
    <PreviewStyled>
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
  height: 120px;

  display: flex;
  justify-content: center;
  align-items: center;

  border: 1px solid ${colors.neutral_light};
  border-radius: ${borderRadius.rounded};

  text-align: center;

  .thumbnail {
    max-width: 100%;
    max-height: 100%;
  }
`;
