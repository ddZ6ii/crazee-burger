import styled from 'styled-components';
import { theme } from '../../../../themes/index';

export default function FormInfo({ children }) {
  return <ParagraphStyled>{children}</ParagraphStyled>;
}

/* __________________________________________________________________________ *\
 ** Style
/* __________________________________________________________________________ */
const { colors } = theme;

const ParagraphStyled = styled.p`
  color: ${colors.status.info};
  grid-column: 2 / -1;
`;
