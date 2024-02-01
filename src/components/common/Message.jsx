import styled from 'styled-components';

import { theme } from '../../themes/index';

export default function Message({ message, icon, className }) {
  return (
    <ContainerStyled className={className}>
      <span>{message}</span>
      {icon && icon}
    </ContainerStyled>
  );
}

/* __________________________________________________________________________ *\
 ** Style
/* __________________________________________________________________________ */
const { breakpoints, fonts, spacing } = theme;

const ContainerStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${spacing['sm']};
  font-family: ${fonts.family.headings};
  font-size: ${fonts.size['xl']};
  text-align: center;

  @media screen and (min-width: ${breakpoints.xl}) {
    font-size: ${fonts.size['2xl']};
  }
`;
