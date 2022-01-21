import React from "react";
import { Dropdown } from "react-bootstrap";
import "./MenuDropdown.css";
import { withRouter } from "react-router-dom";
import venlyHelpers from "../../helpers/venly";

const MenuDropdown = ({ history }) => {
  const handleLogout = async () => {
    await venlyHelpers.logOut();
    localStorage.removeItem("dstoken");
    const isAuth = await venlyHelpers.checkAuth();
    window.location = "/discover";
    console.log("AFTER LOG OUT", isAuth.isAuthenticated);
  };
  return (
    <Dropdown.Menu align="end">
      <Dropdown.Header>MY PROFILE</Dropdown.Header>
      <Dropdown.Item eventKey="1" onClick={() => history.push("/profile")}>
        Profile
      </Dropdown.Item>
      <Dropdown.Item eventKey="2" onClick={handleLogout}>
        Log out
      </Dropdown.Item>
    </Dropdown.Menu>
  );
};

export default withRouter(MenuDropdown);
