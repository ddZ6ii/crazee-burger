import styled, { css } from 'styled-components';
import { IoAddOutline } from 'react-icons/io5';
import { IoRemoveOutline } from 'react-icons/io5';
import { IoTrashBinSharp } from 'react-icons/io5';
import { LuTrash } from 'react-icons/lu';

import Button from '../../../../../common/Button';
import Input from '../../../../../common/Input';
import { useCart } from '../../../../../../hooks/useCart';
import { formatPrice } from '../../../../../../utilities/maths';
import { theme } from '../../../../../../themes';

export default function ItemCard({
  item,
  qty,
  isLastItem,
  isClickable,
  isSelected,
  onSelect,
}) {
  const formattedPrice = formatPrice(item.price);
  const { addToCart, removeFromCart, deleteFromCart, setItemQty } = useCart();

  return (
    <CardStyled
      $isLastItem={isLastItem}
      $isClickable={isClickable}
      $isSelected={isSelected}
      onClick={onSelect}
    >
      <img src={item.imageSource} alt={item.title} className="thumbnail" />
      <InfoStyled $isSelected={isSelected}>
        <div className="info">
          <h3 className="title">{item.title}</h3>
          <p className="price">{formattedPrice}</p>
        </div>
        <ActionStyled $isSelected={isSelected}>
          <QuantityStyled $isSelected={isSelected}>
            <Button
              Icon={qty === 0 ? <LuTrash /> : <IoRemoveOutline />}
              title="Decrease item's quantity by one"
              className="btn btn__qty btn__remove"
              onClick={(e) => {
                e.stopPropagation();
                removeFromCart(item.id);
              }}
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
              onChange={(e) => {
                e.stopPropagation();
                const itemQty = e.target.value;
                setItemQty(item.id, itemQty);
              }}
            />
            <Button
              Icon={<IoAddOutline />}
              title="Increase item's quantity by one"
              className="btn btn__qty btn__add"
              onClick={(e) => {
                e.stopPropagation();
                addToCart(item.id);
              }}
            />
          </QuantityStyled>
          <Button
            Icon={<IoTrashBinSharp />}
            title="Remove item from cart"
            className="btn btn__delete"
            onClick={(e) => {
              e.stopPropagation();
              deleteFromCart(item.id);
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
const { borderRadius, breakpoints, colors, fonts, shadows, spacing } = theme;

const GAP_SPACING = spacing['2xs'];

const clickableStyle = css`
  cursor: ${(props) => props.$isClickable && 'pointer'};
  &:hover {
    box-shadow: ${shadows.md};
  }
`;

const selectedStyle = css`
  background-color: ${colors.accent};
  &:hover {
    outline-color: ${colors.neutral_lightest};
    box-shadow: ${shadows.md};
  }
`;

const CardStyled = styled.li`
  padding: ${spacing['xs']};
  margin-bottom: ${spacing['xs']};

  display: grid;
  grid-template-columns: 80px 1fr;
  grid-auto-rows: minmax(80px, auto);
  column-gap: ${spacing.xs};

  outline: 2px solid transparent;
  border-radius: ${borderRadius.rounded_lg};

  color: ${colors.neutral_darkest};
  font: ${fonts.size.md} ${fonts.family.cta};

  transition-duration: 0.3s;
  transition-timing-function: ease-in-out;
  transition-property: outline-color, box-shadow, transform;

  .btn {
    padding: 0;
    font: inherit;
  }

  .thumbnail {
    margin-inline: auto;
    height: 100%;
    max-height: 80px;
    width: 100%;
    object-fit: contain;
  }

  ${(props) => props.$isClickable && clickableStyle}
  ${(props) => props.$isSelected && selectedStyle}
`;

const InfoStyled = styled.div`
  display: grid;
  align-items: center;
  gap: ${GAP_SPACING};

  .info {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  .title {
    font: 28px ${fonts.family.headings};
    flex-basis: 50%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .price {
    color: ${(props) =>
      props.$isSelected ? colors.neutral_lightest : colors.accent};
    font: ${fonts.size['md']} ${fonts.family.body};
  }
`;

const ActionStyled = styled.div`
  grid-column: 1 / -1;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: ${GAP_SPACING};

  .btn__delete {
    width: fit-content;
    color: ${(props) =>
      props.$isSelected ? colors.neutral_darkest : colors.neutral};
    font-size: ${fonts.size.lg};
    &:is(:hover, :focus-visible) {
      color: ${colors.status.danger};
    }
    &:hover {
      color: ${colors.status.danger};
      animation: tilt-shaking 200ms infinite;
    }
    &:focus-visible {
      outline-color: ${colors.status.danger};
      animation: tilt-shaking 200ms infinite;
    }
    @keyframes tilt-shaking {
      0% {
        transform: rotate(0deg);
      }
      25% {
        transform: rotate(10deg);
      }
      50% {
        transform: rotate(0eg);
      }
      75% {
        transform: rotate(-10deg);
      }
      100% {
        transform: rotate(0deg);
      }
    }
  }
`;

const QuantityStyled = styled.div`
  width: fit-content;
  display: flex;
  align-items: center;
  outline: 1px solid
    ${(props) => (props.$isSelected ? colors.neutral : colors.neutral)};
  background-color: ${(props) =>
    props.$isSelected ? colors.neutral_lightest : 'transparent'};
  border-radius: ${borderRadius.rounded_full};
  color: ${(props) =>
    props.$isSelected ? colors.neutral_darkest : colors.neutral};
  font-size: ${fonts.size.xs};
  overflow: hidden;

  &:is(:hover, :has(.btn__qty:focus-visible), :has(.input:focus-visible)) {
    outline-color: ${colors.accent};
  }

  .btn__qty {
    padding: ${spacing['3xs']} ${spacing['2xs']};
    &.btn__remove {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
    &.btn__add {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
    &:is(:hover, :focus-visible) {
      background-color: ${(props) =>
        props.$isSelected ? colors.neutral_darkest : colors.accent};
      color: ${(props) =>
        props.$isSelected ? colors.neutral_lightest : colors.neutral_lightest};
      font-weight: ${fonts.weight.bold};
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
