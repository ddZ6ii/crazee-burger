import styled, { css } from 'styled-components';
import { theme } from '../../themes';

export default function Loader({
  message,
  className,
  version = '',
  size = '',
}) {
  return (
    <LoaderStyled className={className}>
      <SpinnerStyled version={version} size={size} />
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

  @media screen and (min-width: ${breakpoints.md}) {
    font-size: ${fonts.size['2xl']};
  }

  @media screen and (orientation: landscape) and (max-width: ${breakpoints.lg}) {
    font-size: ${fonts.size['xl']};
  }
`;

const VARIANT_VERSIONS = {
  accentOnWhite: css`
    border-color: ${colors.white};
    border-top-color: ${colors.accent};
  `,
};

const VARIANT_SIZES = {
  sm: css`
    width: ${fonts.size.sm};
    height: ${fonts.size.sm};
    border-width: 2px;
  `,
  xl: css`
    width: ${fonts.size.xl};
    height: ${fonts.size.xl};
    border-width: 3px;
  `,
  '2xl': css`
    width: ${fonts.size['2xl']};
    height: ${fonts.size['2xl']};
    border-width: 3px;
  `,
};

const SpinnerStyled = styled.div`
  width: 24px;
  height: 24px;
  border: 3px solid ${colors.neutral_light};
  border-top: 3px solid ${colors.accent};

  border-radius: ${borderRadius.rounded_full};
  animation: spin 1.2s linear infinite;

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  /* Variants styling (add to or overwrite base styling) */
  ${({ version }) => VARIANT_VERSIONS[version]}
  ${({ size }) => VARIANT_SIZES[size]} 
  
  @media screen and (min-width: ${breakpoints.md}) {
    width: 32px;
    height: 32px;
    ${({ size }) => VARIANT_SIZES[size]}
  }

  @media screen and (orientation: landscape) and (max-width: ${breakpoints.lg}) {
    width: 24px;
    height: 24px;
    ${({ size }) => VARIANT_SIZES[size]}
  }
`;
