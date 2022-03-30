import './Header.css';

import { NavLink, useHistory } from 'react-router-dom';
import React, { useState } from 'react';
import { getUserAuthState, getUserProfile } from '../../store/selectors/user';
import { setUserAuthState, setUserProfile, updateUser } from '../../store/actions/user';
import { getVenlyParams } from '../../store/selectors/venly';
import { useDispatch, useSelector } from 'react-redux';

import Avatar from '../../assets/images/profile_logo.png';
import { Dropdown } from 'react-bootstrap';
import LoginButton from '../buttons/login/LoginButton';
import BlackLogo from '../../assets/svg/BlackLogo.svg';
import MenuDropdown from '../menu-dropdown/MenuDropdown';
import { fetchLoggedInUser } from '../../store/actions/user';
import venlyHelpers from '../../helpers/venly';

const Header = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const isUserAuthenticated = useSelector(getUserAuthState);
  const profile = useSelector(getUserProfile);

  const venlyParamsHeader = useSelector(getVenlyParams);
  console.log({ venlyParamsHeader });

  const handleLogin = async () => {
    console.log({ window });
    const ve = await venlyHelpers.login();

    console.log({ ve });
    if (ve === undefined) {
      alert('Login failed: check browser configuration');
      history.push('/login-issue');
      return;
    }

    const wallets = await venlyHelpers.getWallets();

    await updateUser(ve);

    if (ve.userId && ve?.email && ve?.wallets?.length >= 1) {
      dispatch(
        fetchLoggedInUser({
          Email: ve?.email,
          VenlyUID: ve?.userId,
          walletAddress: wallets[0].address,
        }),
      );
      dispatch(setUserAuthState(true));

      dispatch(
        setUserProfile({
          userId: ve?.userId,
          email: ve?.email,
          firstName: ve?.firstName,
          lastName: ve?.lastName,
          hasMasterPin: ve?.hasMasterPin,
          walletAddress: wallets[0].address,
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
            <img src={BlackLogo} alt="dropstar logo" width="183px" height="32px" />
          </div>
          <div className="d-flex align-items-center">
            <NavLink to="/discover" className="discover">
              Discover
            </NavLink>
            <a href="https://www.dropstar.org/faq" className="faq" target="_blank">
              FAQ
            </a>
            {/* <NavLink to="/faq" className="faq">
              FAQ
            </NavLink> */}
            {isUserAuthenticated && <span>{profile?.email}</span>}
            {isUserAuthenticated && (
              <Dropdown>
                <Dropdown.Toggle id="dropdown-custom-1">
                  <img
                    src={Avatar}
                    alt="user"
                    className="user-image"
                    height="50px"
                    onClick={ToggleShowMenu}
                  />
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
