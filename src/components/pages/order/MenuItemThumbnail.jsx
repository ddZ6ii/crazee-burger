import styled from 'styled-components';

export default function MenuItemThumbnail({ src, title }) {
  return (
    <MenuItemThumbnailStyled>
      <img src={src} alt={title} />
    </MenuItemThumbnailStyled>
  );
}

/* __________________________________________________________________________ *\
 ** Style
/* __________________________________________________________________________ */
const MenuItemThumbnailStyled = styled.div`
  min-height: 145px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
