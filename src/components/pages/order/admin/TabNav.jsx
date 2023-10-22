import styled from 'styled-components';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

import { useAdmin } from '../../../../hooks/useAdmin';
import Tab from '../../../common/Button';
import { adminTabs as tabs } from './helpers/adminTabs';
import { theme } from '../../../../themes';
import { classNames } from '../../../../utilities/classNames';

export default function TabNav() {
  const { isPanelExpanded, expandPanel, activeTab, selectActiveTab } =
    useAdmin();

  const isTabActive = (tabId) => tabId === activeTab;

  const handleClickTab = (tabId) => {
    selectActiveTab(tabId);
    if (!isPanelExpanded) expandPanel(!isPanelExpanded);
  };

  return (
    <TabNavStyled>
      <Tab
        aria-label="toggle-panel"
        Icon={isPanelExpanded ? <FiChevronDown /> : <FiChevronUp />}
        className={classNames(
          'navitem__btn',
          'btn-togglePanel',
          !isPanelExpanded && 'is-active'
        )}
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
  gap: ${spacing['4xs']};

  .navitem__btn {
    padding: ${spacing['2xs']} ${spacing.sm};
    width: fit-content;

    flex-direction: row-reverse;

    background-color: ${colors.white};
    border: 1px solid ${colors.neutral_light};
    border-bottom: 0;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    box-shadow: ${shadows.sm};
    outline: 2px solid transparent;

    color: ${colors.neutral};
    font-size: ${fonts.size.sm};
    transition: none;

    &:hover {
      text-decoration: underline;
    }
    &:focus {
      outline-color: ${colors.accent};
    }
  }

  .btn-togglePanel {
    gap: 0;
  }

  .is-active {
    color: ${colors.white};
    background-color: ${colors.neutral_darkest};
    border-color: transparent;
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
