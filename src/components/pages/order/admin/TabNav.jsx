import styled from 'styled-components';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

import { useExpandPanel, usePanelTab } from '../../../../hooks/usePanelStore';
import Button from '../../../common/Button';
import { theme } from '../../../../themes';

export default function TabNav({ tabItems }) {
  const [isPanelExpanded, expandPanel] = useExpandPanel();
  const [activeTab, selectActiveTab] = usePanelTab();

  const toggleMenuStyle = `navitem__btn btn-expandPanel ${
    !isPanelExpanded ? 'is-active' : ''
  }`;

  const styleNavItem = (tabID) => {
    const isTabActive = tabID === activeTab;
    return `navitem__btn ${isTabActive ? 'is-active' : ''}`;
  };

  const handleClick = (id) => {
    selectActiveTab(id);
    if (!isPanelExpanded) expandPanel(!isPanelExpanded);
  };

  return (
    <TabNavStyled>
      <Button
        Icon={isPanelExpanded ? <FiChevronDown /> : <FiChevronUp />}
        className={toggleMenuStyle}
        onClick={() => expandPanel(!isPanelExpanded)}
      />

      {tabItems.map((tabItem) => (
        <Button
          key={tabItem.id}
          Icon={tabItem.navIcon}
          label={tabItem.navTitle}
          className={styleNavItem(tabItem.id)}
          onClick={() => handleClick(tabItem.id)}
        />
      ))}
    </TabNavStyled>
  );
}

/* __________________________________________________________________________ *\
 ** Style
/* __________________________________________________________________________ */
const { colors, spacing } = theme;

const TabNavStyled = styled.nav`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  transform: translateY(-100%);

  margin-inline: auto;
  width: 90%;
  display: flex;
  align-items: center;
  gap: ${spacing['4xs']};

  /* list-style-type: none; */

  .navitem__btn {
    padding: ${spacing['2xs']} ${spacing.sm};
    width: fit-content;

    flex-direction: row-reverse;

    background-color: ${colors.white};
    border: 1px solid ${colors.neutral_light};
    border-bottom: 0;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;

    color: ${colors.neutral};

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
`;