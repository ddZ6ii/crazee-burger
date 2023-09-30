// import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { useShowPanel } from '../../../hooks/usePanelStore';

import AdminPanel from './AdminPanel';
import ProductList from './ProductList';

import { theme } from '../../../themes';

export default function OrderPage() {
  const [isPanelVisible] = useShowPanel();

  return (
    <SectionStyled>
      <ProductList />
      {isPanelVisible && <AdminPanel />}
    </SectionStyled>
  );
}

/* __________________________________________________________________________ *\
 ** Style
/* __________________________________________________________________________ */
const { breakpoints, borderRadius, colors, shadows } = theme;

const SectionStyled = styled.section`
  background-color: ${colors.neutral_lightest};
  box-shadow: ${shadows.lg};

  @media screen and (min-width: ${breakpoints.md}) {
    height: 100%;
    display: grid;
    grid-template-rows: 1fr auto;
    border-bottom-left-radius: ${borderRadius.rounded_lg};
    border-bottom-right-radius: ${borderRadius.rounded_lg};
  }

  @media screen and (min-width: ${breakpoints.lg}) {
    border-bottom-left-radius: ${borderRadius.rounded_2xl};
    border-bottom-right-radius: ${borderRadius.rounded_2xl};
  }

  @media screen and (orientation: landscape) and (max-width: ${breakpoints.lg}) {
    border-radius: 0;
  }
`;
