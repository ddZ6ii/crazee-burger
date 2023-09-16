import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { useShowPanel } from '../../../hooks/usePanelStore';

import AdminPanel from './AdminPanel';
import LoadingSpinner from '../../common/LoadingSpinner';
import Product from './Product';

import { theme } from '../../../themes';
import { fakeMenu2 as products } from '../../../data/fakeMenus';

export default function OrderPage() {
  const [menus, setMenus] = useState([]);
  const [isAdminPanelVisible] = useShowPanel();

  useEffect(() => {
    setMenus(products);
  }, []);

  return (
    <SectionStyled>
      <MenuStyled>
        {menus.length ? (
          menus.map((product) => <Product key={product.id} product={product} />)
        ) : (
          <LoadingSpinner
            message="Loading menus..."
            className="spinnerContainer"
            spinnerSize={40}
          />
        )}
      </MenuStyled>
      {isAdminPanelVisible && <AdminPanel />}
    </SectionStyled>
  );
}

/* __________________________________________________________________________ *\
 ** Style
/* __________________________________________________________________________ */
const NAVBAR_HEIGHT_MOBILE = '95px';
const NAVBAR_HEIGHT_DESKTOP = '148px';
const { breakpoints, borderRadius, colors, spacing } = theme;

const SectionStyled = styled.section`
  // IN PROGRESS
  height: calc(100dvh - ${NAVBAR_HEIGHT_DESKTOP});
  display: grid;
  grid-template-rows: 1fr auto;
  /* overflow: hidden; */

  background-color: ${colors.neutral_lightest};
  border-bottom-left-radius: ${borderRadius['rounded_2xl']};
  border-bottom-right-radius: ${borderRadius['rounded_2xl']};
  box-shadow: 0px 8px 20px 8px rgba(0, 0, 0, 0.2) inset;
`;

const MenuStyled = styled.div`
  padding: ${spacing.md};
  // IN PROGRESS
  /* min-height: calc(100dvh - ${NAVBAR_HEIGHT_MOBILE}); */
  /* position: relative; */

  display: grid;
  grid-template-columns: minmax(240px, 1fr);
  justify-items: center;
  column-gap: 60px;
  row-gap: 32px;

  overflow-y: scroll;

  @media screen and (min-width: ${breakpoints.sm}) {
    padding: ${spacing['2xl']} ${spacing['xl']};
    // IN PROGRESS
    /* min-height: calc(100dvh - ${NAVBAR_HEIGHT_DESKTOP}); */

    grid-template-columns: repeat(auto-fill, 240px);
    justify-content: center;
    column-gap: clamp(20px, 6vw, 85px);
    row-gap: clamp(20px, 6vw, 85px);
  }

  @media screen and (min-width: ${breakpoints.lg}) {
    column-gap: 85px;
    row-gap: 60px;
  }

  @media screen and (max-width: ${breakpoints.lg}) and (orientation: landscape) {
    padding: ${spacing.sm};
  }

  .spinnerContainer {
    display: flex;
    align-items: center;
    gap: ${spacing['2xs']};
  }
`;
