// import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { useShowPanel } from '../../../hooks/usePanelStore';

import AdminPanel from './AdminPanel';
import ProductList from './ProductList';

import { theme } from '../../../themes';

export default function OrderPage() {
  const [isAdminPanelVisible] = useShowPanel();

  return (
    <SectionStyled>
      <ProductList />
      {isAdminPanelVisible && <AdminPanel />}
    </SectionStyled>
  );
}

/* __________________________________________________________________________ *\
 ** Style
/* __________________________________________________________________________ */
const NAVBAR_HEIGHT_DESKTOP = '148px';
const { breakpoints, borderRadius, colors } = theme;

const SectionStyled = styled.section`
  background-color: ${colors.neutral_lightest};
  border-bottom-left-radius: ${borderRadius['rounded_2xl']};
  border-bottom-right-radius: ${borderRadius['rounded_2xl']};
  box-shadow: 0px 8px 20px 8px rgba(0, 0, 0, 0.2) inset;

  @media screen and (min-width: ${breakpoints.sm}) {
    height: calc(100dvh - ${NAVBAR_HEIGHT_DESKTOP});
    display: grid;
    grid-template-rows: 1fr auto;
  }
  @media screen and (max-width: ${breakpoints.lg}) and (orientation: landscape) {
    height: auto;
    display: block;
  }
`;
