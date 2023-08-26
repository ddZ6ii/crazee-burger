import styled from 'styled-components';
import { theme } from '../../../themes';

export default function OrderPage() {
  return (
    <SectionStyled>
      <h1>Order Page</h1>
    </SectionStyled>
  );
}

/* __________________________________________________________________________ *\
 ** Style
/* __________________________________________________________________________ */
const NAVBAR_HEIGHT_MOBILE = '95px';
const NAVBAR_HEIGHT_DESKTOP = '148px';
const { breakpoints, borderRadius, colors, fonts, spacing } = theme;

const SectionStyled = styled.section`
  padding: ${spacing.md};
  min-height: calc(100dvh - ${NAVBAR_HEIGHT_MOBILE});

  @media screen and (min-width: ${breakpoints.sm}) {
    padding: ${spacing['2xl']} ${spacing['xl']};
    min-height: calc(100dvh - ${NAVBAR_HEIGHT_DESKTOP});
  }

  position: relative;

  background-color: ${colors.neutral_lightest};
  border-bottom-left-radius: ${borderRadius['rounded_2xl']};
  border-bottom-right-radius: ${borderRadius['rounded_2xl']};
  box-shadow: 0px 8px 20px 8px rgba(0, 0, 0, 0.2) inset;

  & h1 {
    font-size: clamp(${fonts.size.xl}, 6vw, ${fonts.size['2xl']});
  }
`;
