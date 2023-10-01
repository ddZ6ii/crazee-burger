import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { BsPersonCircle } from 'react-icons/bs';
import { TbLogout2 } from 'react-icons/tb';

import { useUserName, useLogout } from '../../../hooks/useUser';
import { useAdmin } from '../../../hooks/useAdmin';
import Button from '../../common/Button';
import { theme } from '../../../themes';

export default function NavbarUserInfo() {
  const navigate = useNavigate();
  const userName = useUserName();
  const logout = useLogout();
  const { resetPanelInfo } = useAdmin();

  const handleLogOut = () => {
    logout();
    resetPanelInfo();
    navigate('/');
  };

  return (
    <ContainerStyled>
      <div className="container">
        <p className="userInfo">
          Hi, <span className="userInfo__userName">{userName}</span>
        </p>
        <Button
          label="Sign Out"
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
  gap: ${spacing.xs};

  .container {
    display: block;
    color: ${colors.neutral_light};
    line-height: 1.375;
    font-family: ${fonts.family.body};
    font-size: ${fonts.size.sm};
    font-weight: ${fonts.weight.regular};
    text-align: right;
  }

  .userInfo {
    display: none;
    line-height: 20px;
  }

  .userInfo__userName {
    color: ${colors.accent};
    font-weight: ${fonts.weight.bold};
  }

  .logout__btn {
    padding: 0;
    width: fit-content;

    display: flex;
    gap: ${spacing['3xs']};
    align-items: center;
    flex-direction: column-reverse;

    background-color: transparent;
    backdrop-filter: none;
    border: none;
    border-radius: 0;

    color: ${colors.neutral_light};
    line-height: 1;
    font-family: ${fonts.family.body};
    font-size: ${fonts.size['sm']};
    text-align: right;
    transition: 0.3s ease;

    & span {
      display: none;
    }

    &:hover {
      color: ${colors.neutral_lightest};
      & .logout__btnIcon {
        color: ${colors.neutral_lightest};
      }
    }
  }

  .logout__btnIcon {
    height: auto;
    width: ${fonts.size['xl']};
    color: ${colors.neutral_light};
    transition: 0.3s ease;
  }

  .userIcon {
    height: ${fonts.size['2xl']};
    width: auto;
    display: none;
    color: ${colors.neutral_light};
  }

  @media screen and (min-width: ${breakpoints.md}) {
    .container {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: ${spacing['4xs']};
    }
    .userInfo {
      display: block;
    }
    .logout__btn {
      flex-direction: row-reverse;
      & span {
        display: block;
      }
    }
    .logout__btnIcon {
      width: ${fonts.size.md};
    }
    .userIcon {
      display: block;
    }
  }

  @media screen and (orientation: landscape) and (max-width: ${breakpoints.lg}) {
    .userInfo {
      display: none;
    }
    .logout__btn {
      & span {
        display: none;
      }
    }
    .logout__btnIcon {
      width: ${fonts.size['xl']};
    }
    .userIcon {
      display: none;
    }
  }
`;
