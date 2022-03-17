import './Header.css';

import { NavLink, useHistory } from 'react-router-dom';
import React, { useState } from 'react';
import { getUserAuthState, getUserProfile, getBEUser } from '../../store/selectors/user';
import { setUserAuthState, setUserProfile } from '../../store/actions/user';
import { useDispatch, useSelector } from 'react-redux';

import Avatar from '../../assets/svg/user.svg';
import { Dropdown } from 'react-bootstrap';
import LoginButton from '../buttons/login/LoginButton';
import Logo from '../../assets/svg/logo.svg';
import BlackLogo from '../../assets/svg/BlackLogo.svg';
import MenuDropdown from '../menu-dropdown/MenuDropdown';
import { fetchLoggedInUser } from '../../store/actions/user';
import venlyHelpers from '../../helpers/venly';

const Header = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const isUserAuthenticated = useSelector(getUserAuthState);
  const profile = useSelector(getUserProfile);
  const user = useSelector(getBEUser);

  const handleLogin = async () => {
    const ve = await venlyHelpers.login();

    if (ve.userId && ve?.email) {
      dispatch(fetchLoggedInUser({ Email: ve?.email, VenlyUID: ve?.userId }));
      dispatch(setUserAuthState(true));

      dispatch(
        setUserProfile({
          userId: ve?.userId,
          email: ve?.email,
          firstName: ve?.firstName,
          lastName: ve?.lastName,
          hasMasterPin: ve?.hasMasterPin,
        }),
      );
    }
  };

  const [showMenu, setShowMenu] = useState(false);

  const ToggleShowMenu = () => {
    setShowMenu(!showMenu);
  };
  const DirectToDiscoverPage = () => history.push('/discover');

  return (
    <>
      <div className="nav-sub-header">
        <div className="d-flex justify-content-between align-items-center flex-wrap">
          <div className="header-logo" onClick={DirectToDiscoverPage}>
            <img src={BlackLogo} alt="dropstar logo" width={100} height={100} />
          </div>
          <div className="d-flex align-items-center">
            <NavLink to="/discover" className="discover">
              Discover
            </NavLink>
            <NavLink to="/faq" className="faq">
              FAQ
            </NavLink>
            {isUserAuthenticated && <span>{profile?.email}</span>}
            {isUserAuthenticated && (
              <Dropdown>
                <Dropdown.Toggle id="dropdown-custom-1">
                  <img src={Avatar} alt="user" className="user-image" onClick={ToggleShowMenu} />
                </Dropdown.Toggle>
                <MenuDropdown />
              </Dropdown>
            )}
            {!isUserAuthenticated && <LoginButton handleClick={handleLogin} text="Login" />}
          </div>
        </div>
        <hr className="horizontal-line" />
      </div>
    </>
  );
};

export default Header;
