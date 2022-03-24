import "./MenuDropdown.css";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Dropdown } from "react-bootstrap";
import Loader from "../../pages/Spinner";
import { getAppLoadingState } from "../../store/selectors/loader";
import { setAppLoading } from "../../store/actions/appLoader";
import venlyHelpers from "../../helpers/venly";
import { withRouter } from "react-router-dom";

const MenuDropdown = ({ history }) => {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    dispatch(setAppLoading(true));
    // await venlyHelpers.logOut();
    const isAuth = await venlyHelpers.checkAuth();
    localStorage.setItem("dstoken", isAuth?.isAuthenticated);
    dispatch(setAppLoading(false));
    window.location = "/discover";
    return await venlyHelpers.logOut();
  };

  return (
    <Dropdown.Menu align="end">
      <Dropdown.Header>MY PROFILE</Dropdown.Header>
      <Dropdown.Item eventKey="1" onClick={() => history.push("/profile")}>
        Profile
      </Dropdown.Item>
      <Dropdown.Item eventKey="2" onClick={() => handleLogout()}>
        Log out
      </Dropdown.Item>
    </Dropdown.Menu>
  );
};

export default withRouter(MenuDropdown);
