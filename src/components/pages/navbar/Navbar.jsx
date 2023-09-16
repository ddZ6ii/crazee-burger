import { useState } from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useShowPanel } from '../../../hooks/usePanelStore';

import Logo from '../../common/Logo';
import ToggleButton from '../../common/ToggleButton';
import UserInfo from '../order/UserInfo';

import { theme } from '../../../themes';

export default function Navbar() {
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [isAdminPanelVisible, showAdminPanel] = useShowPanel();

  const displayToastNotification = (message) => {
    const toastOptions = {
      autoClose: 3000,
      pauseOnHover: true,
      position: 'bottom-right',
      theme: 'dark',
    };

    if (!isAdminMode) toast.info(message, toastOptions);
  };

  const handleToggle = () => {
    setIsAdminMode((prev) => !prev);
    displayToastNotification('Admin mode enabled');
    showAdminPanel(!isAdminPanelVisible);
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
          className={'navbar__adminMode'}
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
  padding: ${spacing.xs} ${spacing.sm};

  display: flex;
  align-items: center;
  justify-content: space-between;

  background-color: ${colors.white};
  border-top-left-radius: ${borderRadius.rounded_2xl};
  border-top-right-radius: ${borderRadius.rounded_2xl};
  box-shadow:
    0 10px 15px -3px rgb(0 0 0 / 0.1),
    0 4px 6px -4px rgb(0 0 0 / 0.1);

  @media screen and (min-width: ${breakpoints.sm}) {
    padding: ${spacing.sm};
  }

  @media screen and (max-width: ${breakpoints.lg}) and (orientation: landscape) {
    padding: ${spacing['3xs']} ${spacing.sm};
  }

  .navbar__logo {
    gap: ${spacing['3xs']};
    cursor: pointer;

    & span {
      font-size: ${fonts.size['xl']};
      letter-spacing: 1.5px;
      text-transform: uppercase;
    }
    & img {
      height: 33px;
      width: 44px;
    }

    @media screen and (min-width: ${breakpoints.sm}) {
      & span {
        font-size: ${fonts.size['2xl']};
      }
      & img {
        height: 60px;
        width: 80px;
      }
    }

    @media screen and (max-width: ${breakpoints.lg}) and (orientation: landscape) {
      & img {
        height: 45px;
        width: 60px;
      }
    }
  }

  .navbar__info {
    display: flex;
    align-items: center;
    gap: clamp(${spacing.xs}, 4vw, ${spacing['4xl']});
  }

  .navbar__adminMode {
    display: none;

    @media screen and (min-width: ${breakpoints.md}) {
      display: block;
    }

    @media screen and (max-width: ${breakpoints.lg}) and (orientation: landscape) {
      display: none;
    }
  }
`;
