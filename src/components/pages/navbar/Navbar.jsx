import styled from 'styled-components';
import 'react-toastify/dist/ReactToastify.css';

import { useAdmin } from '../../../hooks/useAdmin';

import Logo from '../../common/Logo';
import UserInfo from './UserInfo';
import ToggleButton from '../../common/ToggleButton';

import {
  displayToastNotification,
  TOAST_INFO_SETTINGS,
} from '../../../utilities/notifications';

import { theme } from '../../../themes';

export default function Navbar() {
  const { isAdminMode, showPanel } = useAdmin();

  const handleToggle = () => {
    showPanel(!isAdminMode);
    if (!isAdminMode)
      displayToastNotification('Admin mode enabled', TOAST_INFO_SETTINGS);
  };

  return (
    <NavStyled>
      <Logo className="navbar__logo" onClick={() => window.location.reload()} />

      <div className="navbar__info">
        <ToggleButton
          isChecked={isAdminMode}
          onToggle={handleToggle}
          labelIfChecked="Disable Admin Mode"
          labelIfUnchecked="Enable Admin Mode"
          className={'navbar__toggleBtn'}
        />
        <UserInfo />
      </div>
    </NavStyled>
  );
}

/* __________________________________________________________________________ *\
 ** Style
/* __________________________________________________________________________ */
const { borderRadius, breakpoints, colors, fonts, spacing } = theme;

const NavStyled = styled.nav`
  padding: ${spacing['2xs']} ${spacing.sm};

  display: flex;
  align-items: center;
  justify-content: space-between;

  background-color: ${colors.white};
  background-color: ${colors.neutral_darkest};
  box-shadow:
    0 10px 15px -3px rgb(0 0 0 / 0.1),
    0 4px 6px -4px rgb(0 0 0 / 0.1);

  .navbar__logo {
    gap: ${spacing['3xs']};
    cursor: pointer;

    & span {
      font-size: ${fonts.size['xl']};
      text-transform: uppercase;
    }

    & img {
      height: 32px;
      width: auto;
    }
  }

  .navbar__info {
    display: flex;
    align-items: center;
    gap: clamp(${spacing.xs}, 4vw, ${spacing['4xl']});
  }

  .navbar__toggleBtn {
    display: none;
  }

  @media screen and (min-width: ${breakpoints.md}) {
    border-top-left-radius: ${borderRadius.rounded_lg};
    border-top-right-radius: ${borderRadius.rounded_lg};

    .navbar__toggleBtn {
      display: block;
    }
  }

  @media screen and (min-width: ${breakpoints.lg}) {
    border-top-left-radius: ${borderRadius.rounded_2xl};
    border-top-right-radius: ${borderRadius.rounded_2xl};
  }

  @media screen and (orientation: landscape) and (max-width: ${breakpoints.lg}) {
    border-radius: 0;

    .navbar__toggleBtn {
      display: none;
    }
  }
`;
