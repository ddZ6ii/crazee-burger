import styled from 'styled-components';
import { HiPlus } from 'react-icons/hi';
import { MdModeEditOutline } from 'react-icons/md';

import TabNav from './TabNav';
import TabOutlet from './TabOutlet';
import { theme } from '../../../../themes';

const tabItems = [
  {
    id: 1,
    navTitle: 'Add a product',
    navIcon: <HiPlus />,
    tabContent: 'Add a product',
  },
  {
    id: 2,
    navTitle: 'Update a product',
    navIcon: <MdModeEditOutline />,
    tabContent: 'Update a product',
  },
];

export default function AdminPanel() {
  return (
    <AdminPanelStyled>
      <TabNav tabItems={tabItems} />
      <TabOutlet tabItems={tabItems} />
    </AdminPanelStyled>
  );
}

/* __________________________________________________________________________ *\
 ** Style
/* __________________________________________________________________________ */
const { borderRadius } = theme;

const AdminPanelStyled = styled.aside`
  position: relative;

  /* grid-column: 2 / -1; */

  border-bottom-left-radius: ${borderRadius['rounded_2xl']};
  border-bottom-right-radius: ${borderRadius['rounded_2xl']};
`;
