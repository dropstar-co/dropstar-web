import "./Header.css";

import React, { useState } from "react";

import Avatar from "../../assets/svg/user.svg";
import { Dropdown } from "react-bootstrap";
import DropdownMenu from "../dropdown-menu/DropdownMenu";
// import Hr from "../hr/hr";
import LoginButton from "../buttons/login/LoginButton";
import Logo from "../../assets/svg/logo.svg";
import { useHistory } from "react-router-dom";
import venlyHelpers from '../../helpers/venly'
const Header = () => {
  const onClick = async () => {
    console.log("You clicked on me")
    const ve = await venlyHelpers.login() 
    console.log(ve)
  }
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);

  const ToggleShowMenu = () => setShowMenu(!showMenu);

  return (
    <>
      <div className="nav-sub-header">
        <div className="d-flex justify-content-between align-items-center flex-wrap">
          <div className="header-logo">
            <img src={Logo} alt="dropstar logo" />
          </div>
          <div className="d-flex align-items-center">
            <div className="discover" onClick={() => history.push('/discover')}>Discover</div>
            <div className="faq">FAQ</div>
            {/* <span className="me-2">Myemail@Email.com</span>
            <img
              src={Avatar}
              alt="user"
              className="user-image"
              onClick={ToggleShowMenu}
            /> */}
            <LoginButton handleClick={onClick} text="Login" />
          </div>
        </div>
        <hr className='horizontal-line' />
      </div>
      {showMenu && <DropdownMenu />}
    </>
  );
};

export default Header;
