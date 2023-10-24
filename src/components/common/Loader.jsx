import styled from 'styled-components';
import { theme } from '../../themes';

export default function Loader({ message, className, spinnerColor }) {
  return (
    <LoaderStyled className={className} spinnerColor={spinnerColor}>
      <div className="spinningLoader" />
      {message && <p>{message}</p>}
    </LoaderStyled>
  );
}

/* __________________________________________________________________________ *\
 ** Style
/* __________________________________________________________________________ */
const { borderRadius, breakpoints, colors, fonts } = theme;

const LoaderStyled = styled.div`
  font-size: ${fonts.size['xl']};
  font-family: ${fonts.family.headings};

  .spinningLoader {
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

  @media screen and (min-width: ${breakpoints.md}) {
    font-size: ${fonts.size['2xl']};
    .spinningLoader {
      width: 32px;
      height: 32px;
    }
  }

  @media screen and (orientation: landscape) and (max-width: ${breakpoints.lg}) {
    font-size: ${fonts.size['xl']};
    .spinningLoader {
      width: 24px;
      height: 24px;
    }
  }
`;
