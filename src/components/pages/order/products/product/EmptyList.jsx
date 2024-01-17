import styled from 'styled-components';
import { GiChefToque } from 'react-icons/gi';
import Button from '../../../../common/Button';
import { useAdmin } from '../../../../../hooks/useAdmin';
import { useProducts } from '../../../../../hooks/useProducts';
import { theme } from '../../../../../themes';

export default function EmptyList() {
  const { isAdminMode } = useAdmin();
  const { resetProducts } = useProducts();

  if (isAdminMode)
    return (
      <ContainerStyled>
        <>
          <div className="message__content">
            <h2>Out of stock?</h2>

            <h3>Click below to generate new products</h3>
          </div>
          <Button
            className="message__btn"
            label="Restock Products"
            version="primary"
            onClick={() => resetProducts()}
          />
        </>
      </ContainerStyled>
    );

  return (
    <ContainerStyled>
      <div className="message__content">
        <h2>Sorry we&apos;re sold out!</h2>
        <h3>
          New recipes currently in preparation...
          <GiChefToque />
        </h3>
        <h3>See you soon!</h3>
      </div>
    </ContainerStyled>
  );
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
  }
`;
