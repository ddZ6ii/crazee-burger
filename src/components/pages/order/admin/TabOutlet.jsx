import styled from 'styled-components';

import { useAdmin } from '../../../../hooks/useAdmin';
import { adminTabs as tabs } from './helpers/adminTabs';

import { theme } from '../../../../themes';

export default function TabOutlet() {
  const { activeTab, isPanelExpanded } = useAdmin();

  const selectedTab = tabs.find((tab) => tab.id === activeTab);

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
  min-height: 24vh;
  height: auto;

  background-color: ${colors.white};
  border-bottom-left-radius: ${borderRadius.rounded_lg};
  border-bottom-right-radius: ${borderRadius.rounded_lg};
  box-shadow: ${shadows.sm};
  color: ${colors.neutral};
  font-family: ${fonts.family.cta};

  @media screen and (min-width: ${breakpoints.lg}) {
    padding-inline: ${spacing['4xl']};
  }
`;
