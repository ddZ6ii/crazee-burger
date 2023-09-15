import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { BsPersonCircle } from 'react-icons/bs';
import { TbLogout2 } from 'react-icons/tb';

import { useUserName, useLogout } from '../../../hooks/useStore';

import Button from '../../common/Button';
import { theme } from '../../../themes';

export default function NavbarUserInfo() {
  const navigate = useNavigate();
  const userName = useUserName();
  const logout = useLogout();

  const handleLogOut = () => {
    logout();
    navigate('/');
  };

  return (
    <ContainerStyled>
      <div className="container">
        <p className="userInfo">
          Hello, <span className="userInfo__userName">{userName}</span>
        </p>
        <Button
          label="Log Out"
          className="logout__btn"
          Icon={<TbLogout2 className="logout__btnIcon" />}
          onClick={handleLogOut}
        />
      </div>
      <BsPersonCircle className="userIcon" />
    </ContainerStyled>
  );
}

/* __________________________________________________________________________ *\
 ** Style
/* __________________________________________________________________________ */
const { breakpoints, colors, fonts, spacing } = theme;

const ContainerStyled = styled.div`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${spacing.sm};

  .container {
    display: block;
    @media screen and (min-width: ${breakpoints.sm}) {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: ${spacing['3xs']};
    }

    color: ${colors.neutral};
    line-height: 1.375;
    font-family: ${fonts.family.body};
    font-size: ${fonts.size.md};
    font-weight: ${fonts.weight.regular};
    text-align: right;
  }

  .userInfo {
    display: none;

    @media screen and (min-width: ${breakpoints.sm}) {
      display: block;
    }
  }

  .userInfo__userName {
    color: ${colors.accent};
    font-weight: ${fonts.weight.bold};
  }

  .logout__btn {
    padding: 0;
    padding-bottom: ${spacing['3xs']};
    width: fit-content;

    display: flex;
    gap: ${spacing['3xs']};
    align-items: center;
    flex-direction: column-reverse;
    @media screen and (min-width: ${breakpoints.sm}) {
      flex-direction: row-reverse;
    }

    background-color: transparent;
    backdrop-filter: none;
    border: none;
    border-bottom: 1px solid transparent;
    border-radius: 0;

    color: ${colors.neutral};
    line-height: 1;
    font-family: ${fonts.family.body};
    font-size: ${fonts.size['sm']};
    text-align: right;

    &:hover {
      border-bottom-color: ${colors.neutral};
    }
  }

  .logout__btnIcon {
    height: auto;
    width: ${fonts.size['xl']};
    @media screen and (min-width: ${breakpoints.sm}) {
      width: ${fonts.size.md};
    }
  }

  .userIcon {
    width: ${fonts.size['2xl']};
    height: auto;

    display: none;
    @media screen and (min-width: ${breakpoints.sm}) {
      display: block;
    }

    color: ${colors.neutral};
  }
`;
