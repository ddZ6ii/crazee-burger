import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

import Navbar from '../pages/navbar/Navbar';
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
const { borderRadius, breakpoints, colors, spacing } = theme;

const ContainerStyled = styled.div`
  height: 100dvh;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr;
  background-color: ${colors.accent};

  @media screen and (min-width: ${breakpoints.sm}) {
    padding: ${spacing.md} ${spacing['3xl']};
  }

  @media screen and (max-width: ${breakpoints.lg}) and (orientation: landscape) {
    padding: 0;
  }
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
  border-bottom-left-radius: ${borderRadius.rounded_2xl};
  border-bottom-right-radius: ${borderRadius.rounded_2xl};

  overflow-y: auto;
`;
