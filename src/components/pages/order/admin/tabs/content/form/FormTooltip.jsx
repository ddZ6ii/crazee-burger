import styled from 'styled-components';

import { theme } from '../../../../../../../themes/index';

export default function FormTooltip({ message, icon }) {
  return (
    <ContainerStyled>
      <p>{message}</p>
      {icon && icon}
    </ContainerStyled>
  );
}

/* __________________________________________________________________________ *\
 ** Style
/* __________________________________________________________________________ */
const { fonts, spacing } = theme;

const ContainerStyled = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${spacing['2xs']};
  font-family: ${fonts.family.headings};
  font-size: ${fonts.size.xl};
`;
