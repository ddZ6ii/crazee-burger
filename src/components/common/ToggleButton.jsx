import styled from 'styled-components';
import { theme } from '../../themes';

export default function ToggleButton({
  isChecked = false,
  onToggle,
  labelIfChecked = 'Disable',
  labelIfUnchecked = 'Enable',
  className,
}) {
  return (
    <ToggleButtonStyled className={className}>
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
      />
    </ToggleButtonStyled>
  );
}

/* __________________________________________________________________________ *\
 ** Style
/* __________________________________________________________________________ */
const { borderRadius, colors, fonts, spacing } = theme;
const SLIDER_SIZE = {
  width: '200px',
  height: '40px',
};
const SWITCH_SIZE = {
  width: '28px',
  height: '28px',
};

const ToggleButtonStyled = styled.div`
  height: ${SLIDER_SIZE.height};
  width: ${SLIDER_SIZE.width};

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

    width: ${SWITCH_SIZE.width};
    height: ${SWITCH_SIZE.height};

    position: absolute;

    background-color: ${colors.accent};
    border-radius: ${borderRadius.rounded_full};
    z-index: 2;

    transition: all 500ms ease;
  }

  // text inside the switch button (for checked and unchecked)
  .rounded:after {
    max-width: 75%;

    position: absolute;

    font-family: ${fonts.family.body};
    font-size: ${fonts.size['sm']};
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
      background-color: rgba(0, 0, 0, 0.85);
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
      color: ${colors.accent};

      transform: translateX(calc(${SWITCH_SIZE.width} + ${spacing.sm}));
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
      color: ${colors.neutral};

      transform: translateX(calc(-100% - ${SWITCH_SIZE.width} - ${spacing.sm}));
    }
  }
`;
