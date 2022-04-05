import './NavigationBar.css';

import { Container, Navbar, Offcanvas, Nav } from 'react-bootstrap';
import { getUserAuthState, getUserProfile } from '../../store/selectors/user';
import { getWalletType } from '../../store/selectors/wallet';
import { setOpenLoginDialog } from '../../store/actions/wallet';
import { setUserAuthState } from '../../store/actions/user';
import { useDispatch, useSelector } from 'react-redux';

import Footer from '../../pages/footer/Footer';
import Logo from '../../assets/svg/BlackLogo.svg';
import ProfileAvatar from '../../assets/images/profile_logo.png';
import { NavLink } from 'react-router-dom';
import venlyHelpers from '../../helpers/venly';
import { useHistory } from 'react-router-dom';

const NavigationBar = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const profile = useSelector(getUserProfile);
  const walletType = useSelector(getWalletType);
  const isUserAuthenticated = useSelector(getUserAuthState);

  const handleLogin = () => dispatch(setOpenLoginDialog(true));
  const handleLogout = async () => {
    if (walletType === 'venly') {
      await venlyHelpers.logOut();
      const isAuth = await venlyHelpers.checkAuth();
      localStorage.setItem('dstoken', isAuth?.isAuthenticated);
      return await venlyHelpers.logOut();
    }

    if (walletType === 'metamask') {
      console.log('logout with metamask');
      //localStorage.removeItem('walletType');
      localStorage.clear();
      dispatch(setUserAuthState(false));
      return;
    }

    alert(`Wallet type ${walletType} not recognised`);
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
                  <img
                    src={ProfileAvatar}
                    style={{ height: '30px', borderRadius: '50%' }}
                    alt="user"
                  />
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
                    {isUserAuthenticated && (
                      <NavLink className="profile-link" to="/profile">
                        <Nav.Link className="common" href="/profile">
                          Profile
                        </Nav.Link>
                      </NavLink>
                    )}
                    {!isUserAuthenticated && (
                      <NavLink className="profile-link" to="/profile" onClick={handleLogin}>
                        <Nav.Link className="common" href="/profile">
                          Login
                        </Nav.Link>
                      </NavLink>
                    )}
                  </Nav>
                  {isUserAuthenticated && (
                    <NavLink className="logout-link" to="/profile" onClick={handleLogout}>
                      <Nav.Link className="common" href="/profile">
                        Log out
                      </Nav.Link>
                    </NavLink>
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
