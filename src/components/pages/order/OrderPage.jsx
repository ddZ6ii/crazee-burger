import styled from 'styled-components';
import { theme } from '../../../themes';

export default function OrderPage() {
  return (
    <SectionStyled>
      {/* <h1>Order Page</h1> */}
      <div className="container">
        <div className="card"></div>
        <div className="card"></div>
        <div className="card"></div>
        <div className="card"></div>
        <div className="card"></div>
        <div className="card"></div>
        <div className="card"></div>
        <div className="card"></div>
        <div className="card"></div>
        <div className="card"></div>
        <div className="card"></div>
        <div className="card"></div>
        <div className="card"></div>
        <div className="card"></div>
        <div className="card"></div>
        <div className="card"></div>
        <div className="card"></div>
        <div className="card"></div>
        <div className="card"></div>
        <div className="card"></div>
        <div className="card"></div>
        <div className="card"></div>
      </div>
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

  // !____________ Temporary styling (layout) ____________
  .container {
    display: grid;
    grid-template-columns: minmax(240px, 1fr);
    justify-items: center;
    column-gap: 60px;
    row-gap: 32px;
    @media screen and (min-width: ${breakpoints.sm}) {
      grid-template-columns: repeat(auto-fill, 240px);
      justify-content: center;
      column-gap: clamp(20px, 6vw, 85px);
      row-gap: clamp(20px, 6vw, 85px);
    }
    @media screen and (min-width: ${breakpoints.lg}) {
      column-gap: 85px;
      row-gap: 60px;
    }
  }
  .card {
    width: 240px;
    height: 330px;
    background-color: lightcoral;
    border-radius: 15px;
  }
  // !___________________________________

  background-color: ${colors.neutral_lightest};
  border-bottom-left-radius: ${borderRadius['rounded_2xl']};
  border-bottom-right-radius: ${borderRadius['rounded_2xl']};
  box-shadow: 0px 8px 20px 8px rgba(0, 0, 0, 0.2) inset;

  & h1 {
    font-size: clamp(${fonts.size.xl}, 6vw, ${fonts.size['2xl']});
  }
`;
