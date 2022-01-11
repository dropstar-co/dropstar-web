import { Navbar, Container, Offcanvas } from "react-bootstrap";

import Footer from "../../pages/footer/Footer";

import "./NavigationBar.css";
import Logo from "../../assets/svg/logo.svg";
import User from "../../assets/svg/user.svg";

const NavigationBar = () => {
  return (
    <>
      <Navbar expand={false} className="main-nav">
        <Container>
          <div />
          <Navbar.Brand href="/">
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
              <div className="d-flex align-items-center mb-5">
                <img src={User} alt="user" />
                <div className="nav-email">myemail@email.com</div>
              </div>
              <div className="d-flex ms-5">
                <div className="d-flex flex-column align-items-end">
                  <div className="discover-link">Discover</div>
                  <div className="faq-link">FAQ</div>
                  <div className="profile-link">Profile</div>
                  <div className="login-link">Login</div>
                  <div className="logout-link">Log out</div>
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
