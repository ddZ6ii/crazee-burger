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
  color: ${colors.white};
  background-color: ${colors.accent};
  &:hover,
  &:focus {
    background-color: ${colors.white};
    outline-color: ${colors.accent};
    color: ${colors.accent};
  }
  &:active {
    background-color: ${colors.accent};
    color: ${colors.white};
  }
`;

const VARIANT_INFO = css`
  background-color: ${colors.neutral};
  color: ${colors.neutral_lightest};

  &:not(:disabled):hover,
  &:focus {
    color: ${colors.neutral};
    background-color: ${colors.white};
    outline-color: ${colors.neutral};
  }
  &:active {
    background-color: ${colors.neutral};
    color: ${colors.neutral_lightest};
  }
  &:disabled {
    cursor: default;
    background-color: ${colors.neutral_light};
  }
`;

const VARIANT_SUCCESS = css`
  color: ${colors.white};
  background-color: ${colors.info_success};
  &:focus,
  &:not(:disabled):hover {
    color: ${colors.info_success};
    background-color: ${colors.white};
    outline-color: ${colors.info_success};
  }
  &:active {
    background-color: ${colors.info_success};
  }
  &:disabled {
    cursor: default;
    background-color: ${colors.neutral_light};
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

const VARIANTS = {
  minimalist: VARIANT_MINIMALIST,
  primary: VARIANT_PRIMARY,
  info: VARIANT_INFO,
  success: VARIANT_SUCCESS,
  danger: VARIANT_DANGER,
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
