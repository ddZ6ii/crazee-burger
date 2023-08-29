import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

import Navbar from '../pages/order/Navbar';
import { theme } from '../../themes';

export default function RootLayout() {
  return (
    <ContainerStyled>
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
  height: 100dvh;
  padding: ${spacing.xs} ${spacing.sm};
  @media screen and (min-width: ${breakpoints.sm}) {
    padding: ${spacing.md} ${spacing['3xl']};
  }

  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr;

  background-color: ${colors.accent};
`;

const HeaderStyled = styled.header`
  width: 100%;
  max-width: ${breakpoints['2xl']};
  margin-inline: auto;
`;

const MainStyled = styled.main`
  height: 100%;
  width: 100%;
  max-width: ${breakpoints['2xl']};
  margin-inline: auto;

  background-color: ${colors.accent};

  overflow-y: auto;
`;
