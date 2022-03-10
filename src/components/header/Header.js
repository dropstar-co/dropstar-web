import './Header.css';

import { NavLink, useHistory } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { getUserAuthState, getUserProfile } from '../../store/selectors/user';
import { setUserAuthState, setUserProfile } from '../../store/actions/user';
import { useDispatch, useSelector } from 'react-redux';

import Avatar from '../../assets/svg/user.svg';
import { Dropdown } from 'react-bootstrap';
import LoginButton from '../buttons/login/LoginButton';
import Logo from '../../assets/svg/logo.svg';
import MenuDropdown from '../menu-dropdown/MenuDropdown';
import { fetchLoggedInUser } from '../../store/actions/user';
import venlyHelpers from '../../helpers/venly';

import { VenlyConnect } from '@venly/connect';
const VENLY_WIDGET_CLIENT_ID = 'Testaccount';
const VENLY_CHAIN = 'MATIC';
const VENLY_ENVIRONMENT = 'staging';
const venlyConnect = new VenlyConnect(VENLY_WIDGET_CLIENT_ID, {
  environment: VENLY_ENVIRONMENT,
});

const Header = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const isUserAuthenticated = useSelector(getUserAuthState);
  const profile = useSelector(getUserProfile);

  async function checkAuthenticated() {
    const result = await venlyConnect.checkAuthenticated();

    console.log({ result });

    const { email, userId } = result;
    const filteredResult = { email, userId };
    console.log(JSON.stringify({ filteredResult }, null, 2));
    result.authenticated(async function (auth) {
      dispatch(setUserAuthState(true));
    });
  }

  function init() {
    checkAuthenticated();
  }

  async function connect(venlyConnect) {
    try {
      const account = await venlyConnect.flows.getAccount(VENLY_CHAIN);
      console.log({ account });
      dispatch(setUserProfile(Object.assign(profile, { wallets: account.wallets })));
    } catch (error) {
      console.log(error);
    }
  }

  async function updateData() {
    const ve = await venlyConnect.api.getProfile();

    console.log('ve.email');
    console.log(ve.email);
    console.log('ve.userId');
    console.log(ve.userId);

    dispatch(fetchLoggedInUser({ Email: ve?.email, VenlyUID: ve?.userId }));
    dispatch(
      setUserProfile({
        userId: ve?.userId,
        email: ve?.email,
        firstName: ve?.firstName,
        lastName: ve?.lastName,
        hasMasterPin: ve?.hasMasterPin,
      }),
    );

    const wallets = await venlyConnect.api.getWallets({ secretType: VENLY_CHAIN });
    dispatch(setUserProfile(Object.assign(profile, { wallets })));
  }

  useEffect(init, []);
  useEffect(() => {
    if (isUserAuthenticated) updateData();
  }, [isUserAuthenticated]);

  const handleLogin = async () => {
    console.log('Doing the logging');
    const ve = await venlyHelpers.login();

    console.log('ALready logged');
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
    console.log(showMenu);
    setShowMenu(!showMenu);
  };
  const DirectToDiscoverPage = () => history.push('/discover');

  return (
    <>
      <div className="nav-sub-header">
        <div className="d-flex justify-content-between align-items-center flex-wrap">
          <div className="header-logo" onClick={DirectToDiscoverPage}>
            <img src={Logo} alt="dropstar logo" />
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
            {!isUserAuthenticated && (
              <LoginButton handleClick={() => connect(venlyConnect)} text="Login" />
            )}
          </div>
        </div>
        <hr className="horizontal-line" />
      </div>
    </>
  );
};

export default Header;
