import styled from 'styled-components';
import { IoAddOutline } from 'react-icons/io5';
import { IoRemoveOutline } from 'react-icons/io5';
import { IoTrashBinSharp } from 'react-icons/io5';
import { LuTrash } from 'react-icons/lu';

import Button from '../../../../../common/Button';
import Input from '../../../../../common/Input';
import { formatPrice } from '../../../../../../utilities/maths';
import { theme } from '../../../../../../themes';

export default function ItemCard({ item, qty, isLastItem }) {
  const formattedPrice = formatPrice(item.price);

  return (
    <CardStyled $isLastItem={isLastItem}>
      <img src={item.imageSource} alt={item.title} className="thumbnail" />
      <InfoStyled>
        <div className="info">
          <h3 className="title">{item.title}</h3>
          <p className="price">{formattedPrice}</p>
        </div>
        <ActionStyled>
          <QuantityStyled>
            <Button
              Icon={qty === 0 ? <LuTrash /> : <IoRemoveOutline />}
              title="Decrease item's quantity by one"
              className="btn btn__qty"
              onClick={() => alert('Decrement item qty or remove from cart')}
            />
            <Input
              value={qty}
              label="qty"
              type="number"
              isRequired={false}
              min={0}
              max={99}
              step={1}
              title="Enter the desired item quantity"
              className="input__wrapper"
              onChange={() => alert('Update item qty')}
            />
            <Button
              Icon={<IoAddOutline />}
              title="Increase item's quantity by one"
              className="btn btn__qty"
              onClick={() => alert('Increment item qty')}
            />
          </QuantityStyled>
          <Button
            Icon={<IoTrashBinSharp />}
            title="Remove item from cart"
            className="btn btn__remove"
            onClick={() => {
              alert(`Delete ${item.title} from cart`);
            }}
          />
        </ActionStyled>
      </InfoStyled>
    </CardStyled>
  );
}
/* __________________________________________________________________________ *\
 ** Style
/* __________________________________________________________________________ */
const { borderRadius, breakpoints, colors, fonts, spacing } = theme;

const GAP_SPACING = spacing['2xs'];

const CardStyled = styled.li`
  padding-bottom: ${spacing['sm']};
  width: 100%;

  display: grid;
  grid-template-columns: minmax(80px, 25%) 1fr;
  grid-template-rows: minmax(80px, auto);
  column-gap: ${spacing.sm};

  color: ${colors.neutral_darkest};
  font: ${fonts.size.md} ${fonts.family.cta};

  .btn {
    padding: 0;
    font: inherit;
  }

  .thumbnail {
    margin-inline: auto;
    width: 100%;
    height: 100%;
    max-height: 80px;
    object-fit: contain;
  }
`;

const InfoStyled = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  align-items: center;
  gap: ${GAP_SPACING};

  .info {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: ${GAP_SPACING};
  }

  .title {
    font: ${fonts.size.lg} ${fonts.family.body};
    font-weight: ${fonts.weight.bold};
  }

  .price {
    color: ${colors.accent};
    font: ${fonts.size['xl']} ${fonts.family.headings};
    font-weight: ${fonts.weight.bold};
  }
`;

const ActionStyled = styled.div`
  grid-column: 1 / -1;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: ${GAP_SPACING};

  .btn__remove {
    width: fit-content;
    color: ${colors.white};
    color: ${colors.status.danger};
    font-size: ${fonts.size.lg};

    &:hover {
      background-color: ${colors.white};
      color: ${colors.status.danger};
    }
    &:focus-visible {
      border-color: ${colors.accent};
    }
  }
`;

const QuantityStyled = styled.div`
  padding: ${spacing['4xs']} ${spacing['xs']};
  width: fit-content;
  display: flex;
  align-items: center;
  gap: ${GAP_SPACING};
  border: 1px solid ${colors.neutral_light};
  border-radius: ${borderRadius.rounded_full};
  font-size: ${fonts.size.sm};
  .btn__qty {
    &:focus-visible {
      color: ${colors.accent};
    }
    &:hover {
      color: ${colors.accent};
    }
  }
  .input__wrapper {
    width: fit-content;
    & .container {
      width: fit-content;
      padding: 0;
      & .input {
        width: fit-content;
        flex-grow: 0;
        text-align: center;
      }
    }
  }
  @media screen and (min-width: ${breakpoints.base}) {
    .input__wrapper {
      & .container {
        & .input {
          text-align: right;
        }
      }
    }
  }
`;
