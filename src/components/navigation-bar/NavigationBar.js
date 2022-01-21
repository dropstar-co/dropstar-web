import "./NavigationBar.css";

import { Container, Navbar, Offcanvas } from "react-bootstrap";

import Footer from "../../pages/footer/Footer";
import Logo from "../../assets/svg/logo.svg";
import User from "../../assets/svg/user.svg";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUserProfile } from "../../store/selectors/user";
import venlyHelpers from "../../helpers/venly";

const NavigationBar = ({ userIsAuthenticated }) => {
  const profile = useSelector(getUserProfile);

  const handleLogin = async () => {
    const ve = await venlyHelpers.login();
    console.log(ve);
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
              {userIsAuthenticated && (
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
                  {userIsAuthenticated && (
                    <NavLink className="profile-link common" to="/profile">
                      Profile
                    </NavLink>
                  )}
                  {!userIsAuthenticated && (
                    <div className="login-link" onClick={handleLogin}>
                      Login
                    </div>
                  )}
                  {userIsAuthenticated && (
                    <div className="logout-link">Log out</div>
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
