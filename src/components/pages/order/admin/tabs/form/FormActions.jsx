import styled from 'styled-components';

import Button from '../../../../../common/Button';
import Loader from '../../../../../common/Loader';
import { theme } from '../../../../../../themes/index';

export default function FormActions({
  isSubmitting,
  isSubmitDisabled,
  onReset,
}) {
  return (
    <ContainerStyled className="form__buttons">
      <Button
        type="submit"
        label={isSubmitting ? 'Submitting...' : 'Add Product'}
        Icon={
          isSubmitting && (
            <Loader
              className="form__loader"
              version="accentOnWhite"
              size="sm"
            />
          )
        }
        className="form__btn"
        version="success"
        disabled={isSubmitDisabled}
      />
      <Button
        label="Reset"
        className="form__btn"
        version="info"
        disabled={isSubmitting}
        onClick={onReset}
      />
    </ContainerStyled>
  );
}

/* __________________________________________________________________________ *\
 ** Style
/* __________________________________________________________________________ */
const { fonts, spacing } = theme;

const ContainerStyled = styled.div`
  max-width: 650px;
  grid-area: 4 / 2 / span 1 / -1;
  display: flex;
  gap: ${spacing['2xs']};

  .form__btn {
    padding: ${spacing.xs} ${spacing.md};
    font-size: inherit;
  }

  .form__loader {
    & .spinningLoader {
      height: ${fonts.size.sm};
      width: ${fonts.size.sm};
    }
  }
`;
