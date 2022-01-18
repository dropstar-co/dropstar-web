import React from "react";
import "./Header.css";
import Logo from "../../assets/svg/logo.svg";
import LoginButton from "../buttons/login/LoginButton";
import Hr from "../hr/hr";
import auth from '../../helpers/venly'

const Header = () => {
  const onClick = async () => {
    const ve = await auth() 
    console.log(ve)
  }
  return (
    <div className="nav-sub-header">
      <div className="d-flex justify-content-between align-items-center flex-wrap">
        <div className="header-logo">
          <img src={Logo} alt="dropstar logo" />
        </div>
        <div className="d-flex align-items-center">
          <div className="discover">Discover</div>
          <div className="faq">FAQ</div>
          <LoginButton  handleClick={onClick} text="Login" />
          {/* { isAuthenticated  && (<LoginButton  handleClick={onClick} text="Login" />) }  */}
        </div>
      </div>
      <Hr />
    </div>
  );
};

export default Header;
