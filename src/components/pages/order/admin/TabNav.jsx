import styled from 'styled-components';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

import { useAdmin } from '../../../../hooks/useAdmin';
import Tab from '../../../common/Button';
import { adminTabs as tabs } from './helpers/adminTabs';
import { theme } from '../../../../themes';

export default function TabNav() {
  const { isPanelExpanded, expandPanel, activeTab, selectActiveTab } =
    useAdmin();

  const togglePanelStyle = `navitem__btn btn-expandPanel ${
    !isPanelExpanded ? 'is-active' : ''
  }`;

  const styleTab = (tabID) => {
    const isTabActive = tabID === activeTab;
    return `navitem__btn ${isTabActive ? 'is-active' : ''}`;
  };

  const handleClickTab = (tabId) => {
    selectActiveTab(tabId);
    if (!isPanelExpanded) expandPanel(!isPanelExpanded);
  };

  return (
    <TabNavStyled>
      <Tab
        Icon={isPanelExpanded ? <FiChevronDown /> : <FiChevronUp />}
        className={togglePanelStyle}
        onClick={() => expandPanel(!isPanelExpanded)}
      />

      {tabs.map((tab) => (
        <Tab
          key={tab.id}
          Icon={tab.navIcon}
          label={tab.navTitle}
          className={styleTab(tab.id)}
          onClick={() => handleClickTab(tab.id)}
        />
      ))}
    </TabNavStyled>
  );
}

/* __________________________________________________________________________ *\
 ** Style
/* __________________________________________________________________________ */
const { breakpoints, colors, shadows, spacing } = theme;

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

    color: ${colors.neutral};
    transition: none;

    &:hover {
      text-decoration: underline;
    }

    &.is-active {
      color: ${colors.white};
      background-color: ${colors.neutral_darkest};
      border-color: transparent;
    }
  }

  .btn-expandPanel {
    gap: 0;
  }

  @media screen and (min-width: ${breakpoints.lg}) {
    margin-inline: ${spacing['4xl']};
  }
`;
