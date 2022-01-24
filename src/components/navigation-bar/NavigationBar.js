import "./NavigationBar.css";

import { Container, Navbar, Offcanvas } from "react-bootstrap";
import { getUserAuthState, getUserProfile } from "../../store/selectors/user";
import { setUserAuthState, setUserProfile } from '../../store/actions/user';
import { useDispatch, useSelector } from "react-redux";

import Footer from "../../pages/footer/Footer";
import Logo from "../../assets/svg/logo.svg";
import { NavLink } from "react-router-dom";
import User from "../../assets/svg/user.svg";
import venlyHelpers from "../../helpers/venly";

const NavigationBar = () => {
  const dispatch = useDispatch();
  const profile = useSelector(getUserProfile);
  const isUserAuthenticated = useSelector(getUserAuthState);

  const handleLogin = async () => {
    const ve = await venlyHelpers.login();
    if(ve.userId && ve?.email) {
      dispatch(setUserAuthState(true));
      dispatch(
        setUserProfile({
          userId: ve?.userId,
          email: ve?.email,
          firstName: ve?.firstName,
          lastName: ve?.lastName,
          hasMasterPin: ve?.hasMasterPin,
        })
      );
    }
  };
  const handleLogout = async () => {
    await venlyHelpers.logOut();
    const isAuth = await venlyHelpers.checkAuth();
    localStorage.setItem("dstoken", isAuth?.isAuthenticated);
    return await venlyHelpers.logOut()
  };

  return (
    <>
      <Navbar expand={false} className="main-nav">
        <Container>
          <div />
          <Navbar.Brand href="/discover">
            <img src={Logo} alt="dropstar logo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="offcanvasNavbar" />
          <Navbar.Offcanvas
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="offcanvasNavbarLabel"></Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body className="mt-3">
              {isUserAuthenticated && (
                <div className="d-flex align-items-center mb-5">
                  <img src={User} alt="user" />
                  <div className="nav-email">{profile?.email}</div>
                </div>
              )}
              <div className="d-flex ms-5">
                <div className="d-flex flex-column align-items-end">
                  <NavLink className="discover-link common" to="/discover">
                    Discover
                  </NavLink>
                  <NavLink className="faq-link common" to="/faq">
                    FAQ
                  </NavLink>
                  {isUserAuthenticated && (
                    <NavLink className="profile-link common" to="/profile">
                      Profile
                    </NavLink>
                  )}
                  {!isUserAuthenticated && (
                    <div className="login-link" onClick={handleLogin}>
                      Login
                    </div>
                  )}
                  {isUserAuthenticated && (
                    <div className="logout-link" onClick={handleLogout}>Log out</div>
                  )}
                </div>
              </div>
            </Offcanvas.Body>
            <Footer />
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
};

export default NavigationBar;
