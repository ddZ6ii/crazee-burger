import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

import Navbar from './navbar/Navbar';
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

  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr;
  background-color: ${colors.accent};

  @media screen and (min-width: ${breakpoints.md}) {
    padding: ${spacing.xs} ${spacing.sm};
  }

  @media screen and (min-width: ${breakpoints.lg}) {
    padding: ${spacing.md} ${spacing['3xl']};
  }

  @media screen and (orientation: landscape) and (max-width: ${breakpoints.lg}) {
    padding: 0;
  }

  @media screen and (orientation: landscape) and (min-width: ${breakpoints.lg}) and (max-width: ${breakpoints.xl}) {
    padding: ${spacing.xs} ${spacing.sm};
  }
`;

const HeaderStyled = styled.header`
  margin-inline: auto;
  width: 100%;
  max-width: ${breakpoints['2xl']};
`;

const MainStyled = styled.main`
  margin-inline: auto;
  height: 100%;
  width: 100%;
  max-width: ${breakpoints['2xl']};

  background-color: ${colors.accent};
  overflow-y: auto;
`;
