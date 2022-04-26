import './MenuDropdown.css';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dropdown } from 'react-bootstrap';
import { setUserAuthState } from '../../store/actions/user';
import { getWalletType } from '../../store/selectors/wallet';
import venlyHelpers from '../../helpers/venly';
import { withRouter } from 'react-router-dom';
import { setWalletType } from '../../store/actions/wallet';

const MenuDropdown = ({ history }) => {
  const dispatch = useDispatch();
  const walletType = useSelector(getWalletType);

  const handleLogout = async () => {
    if (walletType === 'venly') {
      await venlyHelpers.logOut();
      const isAuth = await venlyHelpers.checkAuth();
      localStorage.setItem('dstoken', isAuth?.isAuthenticated);
      return await venlyHelpers.logOut();
    }

    if (walletType === 'metamask' || walletType === 'walletconnect') {
      localStorage.clear();
      dispatch(setUserAuthState(false));
      return;
    }

    if (!walletType || walletType === undefined || walletType === null) {
      localStorage.clear();
      dispatch(setUserAuthState(false));
      return;
    }

    alert(`MenuDropdown.js:handleLogout --> Wallet type ${walletType} not recognised`);
  };

  return (
    <Dropdown.Menu align="end">
      <Dropdown.Header>MY PROFILE</Dropdown.Header>
      <Dropdown.Item eventKey="1" onClick={() => history.push('/profile')}>
        Profile
      </Dropdown.Item>
      <Dropdown.Item eventKey="2" onClick={() => handleLogout()}>
        Log out
      </Dropdown.Item>
    </Dropdown.Menu>
  );
};

export default withRouter(MenuDropdown);
