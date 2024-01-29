import styled from 'styled-components';

import TabNav from './admin/TabNav';
import TabOutlet from './admin/TabOutlet';

export default function AdminPanel({ className }) {
  return (
    <AdminPanelStyled className={className}>
      <TabNav />
      <TabOutlet />
    </AdminPanelStyled>
  );
}

/* __________________________________________________________________________ *\
 ** Style
/* __________________________________________________________________________ */
const AdminPanelStyled = styled.aside`
  position: relative;
  ${(props) => props.className}
`;
