import styled from 'styled-components';

import { ProductFormProvider } from '../../../../contexts/ProductFormContext';
import TabNav from './TabNav';
import TabOutlet from './TabOutlet';
import { theme } from '../../../../themes';

export default function AdminPanel() {
  return (
    <ProductFormProvider>
      <AdminPanelStyled>
        <TabNav />
        <TabOutlet />
      </AdminPanelStyled>
    </ProductFormProvider>
  );
}

/* __________________________________________________________________________ *\
 ** Style
/* __________________________________________________________________________ */
const { borderRadius, breakpoints } = theme;

const AdminPanelStyled = styled.aside`
  position: relative;
  display: none;
  border-bottom-left-radius: ${borderRadius['rounded_2xl']};
  border-bottom-right-radius: ${borderRadius['rounded_2xl']};

  @media screen and (min-width: ${breakpoints.md}) {
    display: block;
  }
  @media screen and (orientation: landscape) and (max-width: ${breakpoints.lg}) {
    display: none;
  }
`;
