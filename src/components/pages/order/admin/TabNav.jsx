import styled from 'styled-components';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

import Tab from '../../../common/Button.jsx';
import { useAdmin } from '../../../../hooks/useAdmin.js';
import { useAdminTabs } from '../../../../hooks/useAdminTabs.jsx';
import { theme } from '../../../../themes/index.js';
import { classNames } from '../../../../utilities/classNames.js';

export default function TabNav() {
  const { isPanelExpanded, expandPanel, activeTabId, selectActiveTab } =
    useAdmin();
  const tabs = useAdminTabs();

  const isTabActive = (tabId) => tabId === activeTabId;

  const handleClickTab = (tabId) => {
    selectActiveTab(tabId);
    if (!isPanelExpanded) expandPanel(!isPanelExpanded);
  };

  return (
    <TabNavStyled>
      <Tab
        aria-label="toggle-panel"
        Icon={isPanelExpanded ? <FiChevronDown /> : <FiChevronUp />}
        className={classNames('navitem__btn', 'btn-togglePanel')}
        onClick={() => expandPanel(!isPanelExpanded)}
      />

      {tabs.map((tab) => (
        <Tab
          key={tab.id}
          Icon={tab.navIcon}
          label={tab.navTitle}
          className={classNames(
            'navitem__btn',
            isTabActive(tab.id) && 'is-active'
          )}
          onClick={() => handleClickTab(tab.id)}
        />
      ))}
    </TabNavStyled>
  );
}

/* __________________________________________________________________________ *\
 ** Style
/* __________________________________________________________________________ */
const { breakpoints, colors, fonts, shadows, spacing } = theme;

const TabNavStyled = styled.nav`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  transform: translateY(-100%);

  margin-inline: ${spacing['2xl']};
  display: flex;
  align-items: center;
  gap: ${spacing['3xs']};

  .navitem__btn {
    padding: ${spacing['2xs']} ${spacing.sm};

    flex-direction: row-reverse;

    background-color: ${colors.neutral_darkest};
    border: 2px solid transparent;
    border-bottom: 0;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    box-shadow: ${shadows.sm};

    color: ${colors.neutral_lightest};
    font-size: ${fonts.size.sm};
    font-weight: ${fonts.weight.regular};
    outline: 2px solid transparent;

    &:hover {
      text-decoration: underline;
    }
    &:focus {
      border-color: ${colors.accent};
      color: ${colors.accent};
    }
  }

  .btn-togglePanel {
    gap: 0;
  }

  .is-active {
    color: ${colors.neutral};
    background-color: ${colors.white};
    border-color: ${colors.neutral_light};
  }

  @media screen and (min-width: ${breakpoints.lg}) {
    margin-inline: ${spacing['4xl']};
  }

  @media screen and (min-width: ${breakpoints.xl}) {
    .navitem__btn {
      font-size: ${fonts.size.base};
    }
  }
`;
