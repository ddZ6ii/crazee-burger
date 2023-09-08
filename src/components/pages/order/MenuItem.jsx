import styled from 'styled-components';

import MenuItemInfo from './MenuItemInfo';
import MenuItemThumbnail from './MenuItemThumbnail';

import { theme } from '../../../themes';

export default function MenuItem({ menu }) {
  return (
    <MenuItemStyled>
      <MenuItemThumbnail src={menu.imageSource} title={menu.price} />
      <MenuItemInfo price={menu.price} title={menu.title} />
    </MenuItemStyled>
  );
}

/* __________________________________________________________________________ *\
 ** Style
/* __________________________________________________________________________ */
const { borderRadius, colors, spacing } = theme;

const MenuItemStyled = styled.div`
  padding: ${spacing.sm};
  width: 240px;
  min-height: 310px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: ${spacing.xs};

  background-color: ${colors.white};
  border-radius: ${borderRadius.rounded_2xl};
`;
