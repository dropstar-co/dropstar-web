import React from "react";
import "./Header.css";
import Logo from "../../assets/svg/logo.svg";
import LoginButton from "../buttons/login/LoginButton";
import Hr from "../hr/hr";

const Header = () => {
  return (
    <div className="nav-sub-header">
      <div className="d-flex justify-content-between align-items-center flex-wrap">
        <div className="header-logo">
          <img src={Logo} alt="dropstar logo" />
        </div>
        <div className="d-flex align-items-center">
          <div className="discover">Discover</div>
          <div className="faq">FAQ</div>
          <LoginButton text="Login" />
        </div>
      </div>
      <Hr />
    </div>
  );
};

export default Header;
