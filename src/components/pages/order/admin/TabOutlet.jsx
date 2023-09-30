import styled from 'styled-components';

import { useExpandPanel, usePanelTab } from '../../../../hooks/useAdmin';
import { theme } from '../../../../themes';

export default function TabOutlet({ tabItems }) {
  const [isPanelExpanded] = useExpandPanel();
  const [activeTab] = usePanelTab();

  const tabContent = tabItems.find(
    (tabItem) => tabItem.id === activeTab
  ).tabContent;

  return (
    isPanelExpanded && (
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
