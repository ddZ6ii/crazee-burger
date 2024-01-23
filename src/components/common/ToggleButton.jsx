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
  height: '34px',
};

const SWITCH_SIZE = {
  width: '24px',
  height: '24px',
};

const ToggleButtonStyled = styled.div`
  height: ${SLIDER_SIZE.height};
  width: ${SLIDER_SIZE.width};

  transition: 0.5s ease;

  // hides the square box but keeps the core "toggle functionality"
  .toggle {
    display: none;
  }

  .rounded {
    position: relative;

    height: 100%;

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

    position: absolute;

    width: ${SWITCH_SIZE.width};
    height: ${SWITCH_SIZE.height};

    background-color: ${colors.neutral};
    border: 1px solid transparent;
    border-radius: ${borderRadius.rounded_full};
    z-index: 2;

    transition: all 500ms ease;
  }

  // text inside the switch button (for checked and unchecked)
  .rounded:after {
    position: absolute;

    max-width: 75%;

    font-size: ${fonts.size.xs};
    font-weight: 500;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;

    transition: 0.5s ease;
  }

  // toggle transitions (unchecked state)
  .toggle:not(:checked) {
    & + .rounded {
      background-color: ${colors.neutral_light};
    }

    // small circle
    & + .rounded:before {
      left: ${spacing['3xs']};
      transform: translateX(0%);
      background-color: ${colors.neutral};
    }

    // text inside the switch button
    & + .rounded:after {
      content: attr(data-unchecked);
      left: 0;
      color: ${colors.neutral_darkest};
      transform: translateX(calc(${SWITCH_SIZE.width} + ${spacing.sm}));
    }
  }

  // toggle transitions (checked state)
  .toggle:checked {
    & + .rounded {
      background-color: ${colors.accent};
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
      color: ${colors.neutral_darkest};
      transform: translateX(calc(-100% - ${SWITCH_SIZE.width} - ${spacing.sm}));
    }
  }
`;
