import styled from 'styled-components';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { HiPlus } from 'react-icons/hi';
import { MdModeEditOutline } from 'react-icons/md';
import { useExpandPanel, usePanelTab } from '../../../hooks/usePanelStore';

import Button from '../../common/Button';

import { theme } from '../../../themes';

const tabItems = [
  {
    id: 1,
    navTitle: 'Add a product',
    navIcon: <HiPlus />,
    tabContent: 'Add a product',
  },
  {
    id: 2,
    navTitle: 'Update a product',
    navIcon: <MdModeEditOutline />,
    tabContent: 'Update a product',
  },
];

export default function AdminPanel() {
  const [isPanelExpanded, expandPanel] = useExpandPanel();
  const [activeTab, selectActiveTab] = usePanelTab();

  const isTabActive = (id) => id === activeTab;

  const handleCLickTab = (id) => {
    selectActiveTab(id);
    if (!isPanelExpanded) expandPanel(!isPanelExpanded);
  };

  return (
    <ContainerStyled>
      {/* Tabs */}
      <ul className="tab__nav">
        {/* Tab */}
        <li className="tab__navitem">
          <Button
            Icon={isPanelExpanded ? <FiChevronDown /> : <FiChevronUp />}
            className={`navitem__btn btn--expandPanel ${
              !isPanelExpanded ? 'is--active' : ''
            }`}
            onClick={() => expandPanel(!isPanelExpanded)}
          />
        </li>

        {/* Tab */}
        {tabItems.map((tabItem) => (
          <li key={tabItem.id} className="tab__navitem">
            <Button
              Icon={tabItem.navIcon}
              label={tabItem.navTitle}
              className={`navitem__btn ${
                isTabActive(tabItem.id) ? 'is--active' : ''
              }`}
              onClick={() => handleCLickTab(tabItem.id)}
            />
          </li>
        ))}
      </ul>

      {/* TabContent */}
      {isPanelExpanded && (
        <div className="tab__content">
          <p>
            {tabItems.find((tabItem) => tabItem.id === activeTab).tabContent}
          </p>
        </div>
      )}
    </ContainerStyled>
  );
}

/* __________________________________________________________________________ *\
 ** Style
/* __________________________________________________________________________ */
const { borderRadius, colors, fonts, spacing } = theme;

const ContainerStyled = styled.div`
  position: relative;

  /* grid-column: 2 / -1; */

  border-bottom-left-radius: ${borderRadius['rounded_2xl']};
  border-bottom-right-radius: ${borderRadius['rounded_2xl']};

  .tab__nav {
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

    list-style-type: none;
  }

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

    &.is--active {
      color: ${colors.white};
      background-color: ${colors.neutral_darkest};
      border-color: transparent;
    }
  }

  .btn--expandPanel {
    gap: 0;
  }

  .tab__content {
    padding: ${spacing.sm};
    min-height: 25vh;

    background-color: ${colors.white};
    border-bottom-left-radius: ${borderRadius.rounded_lg};
    border-bottom-right-radius: ${borderRadius.rounded_lg};
    /* box-shadow: 0px -8px 20px 8px rgba(0, 0, 0, 0.2) inset; */

    color: ${colors.neutral};
    font-family: ${fonts.family.cta};
  }
`;
