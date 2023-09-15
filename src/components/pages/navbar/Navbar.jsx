import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useUserName, useLogout } from '../../../hooks/useStore';
import { theme } from '../../../themes';

import Logo from '../../common/Logo';
import ToggleButton from './ToggleButton';
import UserInfo from '../order/UserInfo';

export default function Navbar() {
  const navigate = useNavigate();
  const userName = useUserName();
  const logout = useLogout();

  const [isAdminMode, setIsAdminMode] = useState(false);

  const handleRefreshPage = () => window.location.reload();

  const handleLogOut = () => {
    logout();
    navigate('/');
  };

  const handleToggle = () => {
    const enableAdminMode = !isAdminMode;
    setIsAdminMode(enableAdminMode);
    if (enableAdminMode) toast.info('Admin mode enabled');
  };

  return (
    <NavStyled>
      <Logo className="navbar__logo" onClick={handleRefreshPage} />
      <div className="navbar__rightSide">
        <ToggleButton
          isChecked={isAdminMode}
          onToggle={handleToggle}
          labelIfChecked="Disable Admin Mode"
          labelIfUnchecked="Enable Admin Mode"
        />
        <UserInfo userName={userName} onLogOut={handleLogOut} />
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
  @media screen and (min-width: ${breakpoints.sm}) {
    padding: ${spacing.sm};
  }

  display: flex;
  align-items: center;
  justify-content: space-between;

  background-color: ${colors.white};
  border-top-left-radius: ${borderRadius.rounded_2xl};
  border-top-right-radius: ${borderRadius.rounded_2xl};

  box-shadow:
    0 10px 15px -3px rgb(0 0 0 / 0.1),
    0 4px 6px -4px rgb(0 0 0 / 0.1);

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
  }

  .navbar__rightSide {
    display: flex;
    align-items: center;
    gap: clamp(${spacing.xs}, 4vw, ${spacing['4xl']});
  }
`;
