import styled from 'styled-components';

import Button from '../../common/Button';
import { useAdmin } from '../../../hooks/useAdmin';
import { useProducts } from '../../../hooks/useProducts';
import { theme } from '../../../themes';

export default function EmptyList() {
  const { isAdminMode } = useAdmin();
  const { resetProducts } = useProducts();

  const message = isAdminMode ? (
    <>
      <div className="message__content">
        <h2>Empty products list?</h2>
        <h3>Click the button below to reset the list</h3>
      </div>
      <Button
        className="message__btn"
        label="Generate New Products"
        onClick={() => resetProducts()}
      />
    </>
  ) : (
    <div className="message__content">
      <h2>Sorry we&apos;re sold out!</h2>
      <h3>New recipes are being prepared.</h3>
      <h3>See you soon!</h3>
    </div>
  );
  return <ContainerStyled>{message}</ContainerStyled>;
}

/* __________________________________________________________________________ *\
 ** Style
/* __________________________________________________________________________ */
const { colors, fonts, spacing } = theme;

const ContainerStyled = styled.div`
  margin-block: auto;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: ${spacing.lg};

  text-align: center;

  .message__content {
    display: flex;
    flex-direction: column;
    gap: ${spacing.sm};

    & h2 {
      color: ${colors.neutral};
      font-size: ${fonts.size['3xl']};
      font-weight: ${fonts.weight.bold};
    }

    & h3 {
      color: ${colors.neutral};
      font-size: ${fonts.size['2xl']};
      font-weight: ${fonts.weight.regular};
    }
  }

  .message__btn {
    width: fit-content;
    background-color: ${colors.accent};
    font-weight: ${fonts.weight.bold};

    &:hover {
      background-color: ${colors.white};
      border-color: ${colors.accent};
      color: ${colors.accent};
    }
  }
`;
