import styled from 'styled-components';

import TabNav from './TabNav';
import TabOutlet from './TabOutlet';
import { theme } from '../../../../themes';

export default function AdminPanel() {
  return (
    <AdminPanelStyled>
      <TabNav />
      <TabOutlet />
    </AdminPanelStyled>
  );
}

/* __________________________________________________________________________ *\
 ** Style
/* __________________________________________________________________________ */
const { borderRadius, breakpoints } = theme;

const AdminPanelStyled = styled.aside`
  position: relative;

  display: none;

  /* grid-column: 2 / -1; */

  border-bottom-left-radius: ${borderRadius['rounded_2xl']};
  border-bottom-right-radius: ${borderRadius['rounded_2xl']};

  @media screen and (min-width: ${breakpoints.md}) {
    display: block;
  }
  @media screen and (orientation: landscape) and (max-width: ${breakpoints.lg}) {
    display: none;
  }
`;
