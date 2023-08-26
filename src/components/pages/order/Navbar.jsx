import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import Logo from '../../utilities/Logo';
import UserInfo from './UserInfo';

import useUserContext from '../../../hooks/useUserContext';
import { theme } from '../../../themes';

export default function Navbar() {
  const navigate = useNavigate();
  const { userName, logOutUser } = useUserContext();

  const handleRefreshPage = () => {
    location.reload();
  };

  const handleLogOut = () => {
    logOutUser();
    navigate('/');
  };

  return (
    <NavStyled>
      <Logo className="navbar__logo" onClick={handleRefreshPage} />
      <UserInfo userName={userName} onLogOut={handleLogOut} />
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
`;
