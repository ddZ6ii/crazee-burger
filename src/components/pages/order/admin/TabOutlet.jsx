import styled from 'styled-components';

import { useAdmin } from '../../../../hooks/useAdmin';
import { theme } from '../../../../themes';

export default function TabOutlet({ tabItems }) {
  const { activeTab, isAdminPanelExpanded } = useAdmin();

  const tabContent = tabItems.find(
    (tabItem) => tabItem.id === activeTab
  ).tabContent;

  return (
    isAdminPanelExpanded && (
      <TabContentStyled>
        <p>{tabContent}</p>
      </TabContentStyled>
    )
  );
}

/* __________________________________________________________________________ *\
 ** Style
/* __________________________________________________________________________ */
const { borderRadius, colors, fonts, shadows, spacing } = theme;

const TabContentStyled = styled.div`
  padding: ${spacing.sm};
  min-height: 25vh;

  background-color: ${colors.white};
  border-bottom-left-radius: ${borderRadius.rounded_lg};
  border-bottom-right-radius: ${borderRadius.rounded_lg};
  box-shadow: ${shadows.sm};

  color: ${colors.neutral};
  font-family: ${fonts.family.cta};
`;
