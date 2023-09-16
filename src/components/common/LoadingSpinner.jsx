import styled from 'styled-components';
import { theme } from '../../themes';

export default function LoadingSpinner({ message, className, spinnerColor }) {
  return (
    <LoadingSpinnerStyled className={className} spinnerColor={spinnerColor}>
      <div className="loadingSpinner" />
      {message && <p>{message}</p>}
    </LoadingSpinnerStyled>
  );
}

/* __________________________________________________________________________ *\
 ** Style
/* __________________________________________________________________________ */
const { borderRadius, colors } = theme;

const LoadingSpinnerStyled = styled.div`
  .loadingSpinner {
    width: 24px;
    height: 24px;
    border: 3px solid ${colors.neutral_light};
    border-top: 3px solid
      ${(props) => (props.spinnerColor ? props.spinnerColor : colors.accent)};
    border-radius: ${borderRadius.rounded_full};
    animation: spin 1.2s linear infinite;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;
