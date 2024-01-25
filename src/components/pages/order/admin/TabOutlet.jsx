import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { useAdmin } from '../../../../hooks/useAdmin.js';
import { useAdminTabs } from '../../../../hooks/useAdminTabs.jsx';
import { useTabHeight } from '../../../../hooks/useTabHeight.js';
import { theme } from '../../../../themes/index.js';

export default function TabOutlet() {
  const { activeTabId, isPanelExpanded } = useAdmin();
  const tabs = useAdminTabs();

  const tabRef = useRef(null);
  const tabHeight = useTabHeight(tabRef);
  const [minHeight, setMinHeight] = useState(null);

  const selectedTab = tabs.find((tab) => tab.id === activeTabId);

  // Ensure both admin tabs have the same height and avoid tedious media queries in TabOulet styling while minimizing the loss of screen real estate by dynamically adjusting the height of the admin panel to fit its content
  useEffect(() => {
    if (!tabHeight) return;
    setMinHeight(tabHeight);
  }, [tabHeight]);

  return (
    isPanelExpanded && (
      <TabContentStyled
        ref={activeTabId === 0 ? tabRef : null}
        $minHeight={activeTabId !== 0 ? minHeight : 'auto'}
      >
        {selectedTab.content}
      </TabContentStyled>
    )
  );
}

/* __________________________________________________________________________ *\
 ** Style
/* __________________________________________________________________________ */
const { breakpoints, colors, fonts, spacing } = theme;

const TabContentStyled = styled.div`
  padding: ${spacing.md} ${spacing['2xl']};

  height: fit-content;
  min-height: ${(props) => `${props.$minHeight}px`};

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: ${colors.white};
  box-shadow: 0px 4px 28px 0px rgba(0, 0, 0, 0.4);
  color: ${colors.neutral};
  font-family: ${fonts.family.cta};
  font-size: ${fonts.size.sm};

  @media screen and (min-width: ${breakpoints.lg}) {
    padding-inline: ${spacing['4xl']};
  }
`;
