import styled from 'styled-components';
import { theme } from '../../../themes';

export default function ToggleButton({
  isChecked = false,
  onToggle,
  labelIfChecked = 'Disable',
  labelIfUnchecked = 'Enable',
}) {
  return (
    <ToggleButtonStyled>
      <input
        type="checkbox"
        className="toggle"
        id="rounded"
        checked={isChecked}
        onChange={onToggle}
      />
      <label
        htmlFor="rounded"
        className="rounded"
        data-checked={labelIfChecked}
        data-unchecked={labelIfUnchecked}
      ></label>
    </ToggleButtonStyled>
  );
}

/* __________________________________________________________________________ *\
 ** Style
/* __________________________________________________________________________ */
const { borderRadius, colors, fonts, spacing } = theme;

const sliderSize = '30px';

const ToggleButtonStyled = styled.div`
  height: 40px;
  width: 200px;

  // hides the square box but keeps the core "toggle functionality"
  .toggle {
    display: none;
  }

  .rounded {
    height: 100%;

    position: relative;

    display: flex;
    align-items: center;
    justify-content: center;

    border: 2px solid transparent;
    border-radius: ${borderRadius.rounded_full};

    cursor: pointer;

    transition: all 500ms ease;
  }

  // the small round circle
  .rounded:before {
    content: '';

    width: ${sliderSize};
    height: ${sliderSize};

    position: absolute;

    background-color: ${colors.accent};
    border-radius: ${borderRadius.rounded_full};
    z-index: 2;

    transition: all 500ms ease;
  }

  // text inside the switch button (for checked and unchecked)
  .rounded:after {
    max-width: 70%;

    position: absolute;

    font-family: ${fonts.family.cta};
    font-size: ${fonts.size['2xs']};
    font-weight: ${fonts.weight.regular};
    letter-spacing: 0.8px;
    text-transform: uppercase;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  // toggle animations (unchecked state)
  .toggle:not(:checked) {
    & + .rounded {
      background-color: ${colors.neutral_darkest};
    }

    // small circle
    & + .rounded:before {
      left: ${spacing['3xs']};
      transform: translateX(0%);
    }

    // text inside the switch button
    & + .rounded:after {
      content: attr(data-unchecked);
      left: 0;
      transform: translateX(calc(${sliderSize} + ${spacing.sm}));
      color: ${colors.accent};
    }
  }

  // toggle animations (checked state)
  .toggle:checked {
    & + .rounded {
      background-color: ${colors.white};
      border-color: ${colors.accent};
    }

    // small circle
    & + .rounded:before {
      left: 100%;
      transform: translateX(calc(-100% - ${spacing['3xs']}));
    }

    // text inside the switch button
    & + .rounded:after {
      content: attr(data-checked);
      left: 100%;
      transform: translateX(calc(-100% - ${sliderSize} - ${spacing.sm}));
    }
  }
`;
