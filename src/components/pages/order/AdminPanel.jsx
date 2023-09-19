import styled from 'styled-components';

import { useExpandPanel } from '../../../hooks/usePanelStore';

import { theme } from '../../../themes';

export default function AdminPanel() {
  const [isAdminPanelExpanded, expandAdminPanel] = useExpandPanel();

  // console.log('OrderPage - isAdminPanelVisible', isAdminPanelVisible);
  // console.log('OrderPage - isAdminPanelExpanded', isAdminPanelExpanded);
  return (
    <ContainerStyled>
      <div className="tab__container">
        <button
          type="button"
          onClick={() => expandAdminPanel(!isAdminPanelExpanded)}
        >
          Expand/Collapse
        </button>
      </div>

      {isAdminPanelExpanded && (
        <div className="adminPanel">
          <p>Admin Panel</p>
        </div>
      )}
    </ContainerStyled>
  );
}

/* __________________________________________________________________________ *\
 ** Style
/* __________________________________________________________________________ */
const { breakpoints, borderRadius, colors, spacing } = theme;

const ContainerStyled = styled.div`
  border-bottom-left-radius: ${borderRadius['rounded_2xl']};
  border-bottom-right-radius: ${borderRadius['rounded_2xl']};

  .tab__container {
    background-color: white;

    /* width: 100%; */
    /* position: absolute; */
    /* bottom: 0;
    left: 0; */
    /* transform: translateY(-100%); */
  }

  .adminPanel {
    background-color: lightcyan;
    min-height: 25vh;
  }
`;
