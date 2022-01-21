import { Dropdown } from "react-bootstrap";
import { useHistory, NavLink } from "react-router-dom";
import React, { useState } from "react";

import LoginButton from "../buttons/login/LoginButton";
import MenuDropdown from "../menu-dropdown/MenuDropdown";
import venlyHelpers from "../../helpers/venly";

import "./Header.css";
import Avatar from "../../assets/svg/user.svg";
import Logo from "../../assets/svg/logo.svg";

const Header = ({ userIsAuthenticated }) => {
  const history = useHistory();

  const handleLogin = async () => {
    const ve = await venlyHelpers.login();
    console.log(ve);
  };

  const [showMenu, setShowMenu] = useState(false);

  const ToggleShowMenu = () => setShowMenu(!showMenu);
  const DirectToDiscoverPage = () => history.push("/discover");

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
            {userIsAuthenticated && (
              <Dropdown>
                <Dropdown.Toggle id="dropdown-custom-1">
                  <img
                    src={Avatar}
                    alt="user"
                    className="user-image"
                    onClick={ToggleShowMenu}
                  />
                </Dropdown.Toggle>
                <MenuDropdown />
              </Dropdown>
            )}
            {!userIsAuthenticated && (
              <LoginButton handleClick={handleLogin} text="Login" />
            )}
          </div>
        </div>
        <hr className="horizontal-line" />
      </div>
    </>
  );
};

export default Header;
