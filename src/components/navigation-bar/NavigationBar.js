import './NavigationBar.css';

import { Container, Navbar, Offcanvas, Nav } from 'react-bootstrap';
import { getUserAuthState, getUserProfile } from '../../store/selectors/user';
import { setUserAuthState, setUserProfile } from '../../store/actions/user';
import { useDispatch, useSelector } from 'react-redux';

import Footer from '../../pages/footer/Footer';
// import Logo from '../../assets/svg/logo.svg';
import Logo from '../../assets/svg/BlackLogo.svg';
import { NavLink } from 'react-router-dom';
import User from '../../assets/svg/user.svg';
import venlyHelpers from '../../helpers/venly';

const NavigationBar = () => {
  const dispatch = useDispatch();
  const profile = useSelector(getUserProfile);
  const isUserAuthenticated = useSelector(getUserAuthState);

  const handleLogin = async () => {
    const ve = await venlyHelpers.login();
    if (ve.userId && ve?.email) {
      dispatch(setUserAuthState(true));
      dispatch(
        setUserProfile({
          userId: ve?.userId,
          email: ve?.email,
          firstName: ve?.firstName,
          lastName: ve?.lastName,
          hasMasterPin: ve?.hasMasterPin,
          walletAddress: ve.wallets[0].address,
        }),
      );
    }
  };
  const handleLogout = async () => {
    await venlyHelpers.logOut();
    const isAuth = await venlyHelpers.checkAuth();
    localStorage.setItem('dstoken', isAuth?.isAuthenticated);
    return await venlyHelpers.logOut();
  };

  return (
    <>
      <Navbar collapseOnSelect expand={false} className="main-nav">
        <Container>
          <div />
          <Navbar.Brand href="/discover">
            <img src={Logo} height="32px" width="150px" alt="dropstar logo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="offcanvasNavbar" />
          <Navbar.Offcanvas
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
            placement="end">
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
                  <Nav>
                    <NavLink className="discover-link" to="/discover">
                      <Nav.Link className="common" href="/discover">
                        Discover
                      </Nav.Link>
                    </NavLink>
                    <a href="https://www.dropstar.org/faq" className="faq-link" target="_blank">
                      FAQ
                    </a>
                    {/* <NavLink className="faq-link" to="/faq">
                     <Nav.Link className='common' href='/faq'>FAQ</Nav.Link>
                    </NavLink> */}
                    {isUserAuthenticated && (
                      <NavLink className="profile-link" to="/profile">
                        <Nav.Link className="common" href="/profile">
                          Profile
                        </Nav.Link>
                      </NavLink>
                    )}
                    {!isUserAuthenticated && (
                      <div className="login-link" onClick={handleLogin}>
                        Login
                      </div>
                    )}
                  </Nav>
                  {isUserAuthenticated && (
                    <div className="logout-link" onClick={handleLogout}>
                      Log out
                    </div>
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
