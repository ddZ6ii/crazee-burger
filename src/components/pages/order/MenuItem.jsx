import styled from 'styled-components';

import MenuItemInfo from './MenuItemInfo';
import MenuItemThumbnail from './MenuItemThumbnail';

import { fakeMenu2 } from '../../../data/fakeMenus';
import { theme } from '../../../themes';

export default function MenuItem() {
  return (
    <MenuItemStyled>
      <MenuItemThumbnail
        src={fakeMenu2[0].imageSource}
        title={fakeMenu2[0].price}
      />
      <MenuItemInfo price={fakeMenu2[0].price} title={fakeMenu2[0].title} />
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
  /* gap: ${spacing.sm}; */

  background-color: ${colors.white};
  border-radius: ${borderRadius.rounded_2xl};
`;
