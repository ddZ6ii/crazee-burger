import styled, { css } from 'styled-components';

import { theme } from '../../themes';

export default function Button({
  type = 'button',
  label,
  Icon,
  className = 'variantMinimalist',
  version = '',
  onClick = null,
  ...restProps
}) {
  return (
    <ButtonStyled
      type={type}
      className={className}
      version={version}
      onClick={onClick}
      {...restProps}
    >
      <span className="btn__label">{label}</span>
      {Icon && Icon}
    </ButtonStyled>
  );
}

/* __________________________________________________________________________ *\
 ** Style
/* __________________________________________________________________________ */
const { colors, borderRadius, breakpoints, fonts, spacing } = theme;

const VARIANT_MINIMALIST = css``;
const VARIANT_PRIMARY = css`
  background-color: ${colors.accent};
  color: ${colors.white};
  &:hover,
  &:focus {
    background-color: ${colors.white};
    color: ${colors.accent};
    outline-color: ${colors.accent};
  }
  &:active {
    background-color: ${colors.accent};
    color: ${colors.white};
  }
`;
const VARIANT_PRIMARY_INVERTED = css`
  background-color: ${colors.white};
  color: ${colors.accent};
  &:hover,
  &:focus {
    background-color: ${colors.accent};
    color: ${colors.white};
    outline-color: ${colors.white};
  }
  &:active {
    background-color: ${colors.white};
    color: ${colors.accent};
  }
`;
const VARIANT_INFO = css`
  background-color: ${colors.neutral};
  color: ${colors.neutral_lightest};

  &:not(:disabled):hover,
  &:focus {
    background-color: ${colors.white};
    color: ${colors.neutral};
    outline-color: ${colors.neutral};
  }
  &:active {
    background-color: ${colors.neutral};
    color: ${colors.neutral_lightest};
  }
  &:disabled {
    background-color: ${colors.neutral_light};
    cursor: default;
  }
`;
const VARIANT_SUCCESS = css`
  background-color: ${colors.info_success};
  color: ${colors.white};
  &:focus,
  &:not(:disabled):hover {
    background-color: ${colors.white};
    color: ${colors.info_success};
    outline-color: ${colors.info_success};
  }
  &:active {
    background-color: ${colors.info_success};
  }
  &:disabled {
    background-color: ${colors.neutral_light};
    cursor: default;
  }
`;
const VARIANT_DANGER = css`
  color: ${colors.neutral_darkest};
  &:hover {
    color: ${colors.info_danger};
  }
  &:focus {
    color: ${colors.info_danger};
    outline-color: ${colors.info_danger};
  }
`;
const VARIANT_DANGER_INVERTED = css`
  color: ${colors.white};
  &:hover {
    color: ${colors.info_danger};
  }
  &:focus {
    color: ${colors.info_danger};
    outline-color: ${colors.info_danger};
  }
`;
const VARIANTS = {
  minimalist: VARIANT_MINIMALIST,
  primary: VARIANT_PRIMARY,
  primaryInverted: VARIANT_PRIMARY_INVERTED,
  info: VARIANT_INFO,
  success: VARIANT_SUCCESS,
  danger: VARIANT_DANGER,
  dangerInverted: VARIANT_DANGER_INVERTED,
};

const ButtonStyled = styled.button`
  padding: ${spacing.xs};

  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${spacing['2xs']};

  background: none;
  border: 1px solid transparent;
  border-radius: ${borderRadius.rounded};
  outline: 2px solid transparent;

  cursor: pointer;
  line-height: 1;
  font-family: ${fonts.family.cta};
  font-size: ${fonts.size.sm};
  font-weight: ${fonts.weight.bold};
  transition-duration: 0.3s;
  transition-timing-function: ease;
  transition-property: background-color, background-color, border-color,
    outline-color, color;

  /* variants styling (add to or overwrite base styling) */
  ${({ version }) => VARIANTS[version]}

  @media screen and (min-width: ${breakpoints.md}) {
    padding: ${spacing.md};
    gap: ${spacing['xs']};
    font-size: ${fonts.size.base};
  }

  @media screen and (orientation: landscape) and (max-width: ${breakpoints.lg}) {
    padding: ${spacing.xs};
    font-size: ${fonts.size.sm};
  }
`;
