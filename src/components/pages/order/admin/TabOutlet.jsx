import styled from 'styled-components';

import { useAdmin } from '../../../../hooks/useAdmin.js';
import { useAdminTabs } from '../../../../hooks/useAdminTabs.jsx';
import { theme } from '../../../../themes/index.js';

export default function TabOutlet() {
  const { activeTabId, isPanelExpanded } = useAdmin();
  const tabs = useAdminTabs();

  const selectedTab = tabs.find((tab) => tab.id === activeTabId);

  return (
    isPanelExpanded && (
      <TabContentStyled>{selectedTab.content}</TabContentStyled>
    )
  );
}

/* __________________________________________________________________________ *\
 ** Style
/* __________________________________________________________________________ */
const { borderRadius, breakpoints, colors, fonts, shadows, spacing } = theme;

const TabContentStyled = styled.div`
  padding: ${spacing.md} ${spacing['2xl']};
  min-height: 23vh;
  height: 1px;

  background-color: ${colors.white};
  border-bottom-left-radius: ${borderRadius.rounded_lg};
  border-bottom-right-radius: ${borderRadius.rounded_lg};
  box-shadow: ${shadows.sm};
  color: ${colors.neutral};
  font-family: ${fonts.family.cta};
  font-size: ${fonts.size.sm};

  @media screen and (min-width: ${breakpoints.lg}) {
    padding-inline: ${spacing['4xl']};
  }
  @media screen and (min-width: ${breakpoints.xl}) {
    font-size: ${fonts.size.base};
  }
  @media screen and (orientation: landscape) and (max-width: ${breakpoints.xl}) {
    min-height: 33vh;
  }
`;
