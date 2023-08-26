import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

import Navbar from '../pages/order/Navbar';
import { theme } from '../../themes';

export default function RootLayout() {
  return (
    <ContainerStyled className="wrapper">
      <HeaderStyled>
        <Navbar />
      </HeaderStyled>
      <MainStyled>
        <Outlet />
      </MainStyled>
    </ContainerStyled>
  );
}

/* __________________________________________________________________________ *\
 ** Style
/* __________________________________________________________________________ */
const { breakpoints, colors, spacing } = theme;

const ContainerStyled = styled.div`
  padding: ${spacing.xs} ${spacing.sm};
  @media screen and (min-width: ${breakpoints.sm}) {
    padding: ${spacing.md} ${spacing['3xl']};
  }

  background-color: ${colors.accent};
`;

const HeaderStyled = styled.header`
  width: 100%;
  max-width: ${breakpoints['2xl']};
  margin-inline: auto;

  position: sticky;
  top: 0;
  left: 0;
  z-index: 2;
`;

const MainStyled = styled.main`
  width: 100%;
  max-width: ${breakpoints['2xl']};
  margin-inline: auto;

  background-color: ${colors.accent};
`;
