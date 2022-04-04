import {
  setUserAuthState,
  setUserProfile,
  updateUser,
  fetchLoggedInUser,
} from './store/actions/user';
import { setOpenLoginDialog, setWalletType } from './store/actions/wallet';
import { useEffect, useState } from 'react';

import Header from './components/header/Header';
import Loader from './pages/Spinner';
import MainFooter from './pages/desktop-footer/MainFooter';
import NavigationBar from './components/navigation-bar/NavigationBar';
import Routes from './Routes';
import { Switch, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import venlyHelpers from './helpers/venly';

import { Button } from 'react-bootstrap';
import Modal from 'react-modal';

import { getWalletType, isOpenLoginDialog } from './store/selectors/wallet';

const App = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const isOpenLoginDialogValue = useSelector(isOpenLoginDialog);

  console.log({ isOpenLoginDialogValue });

  useEffect(() => {
    setLoading(true);
    const gets = async () => {
      const isAuth = await venlyHelpers.checkAuth();
      dispatch(setUserAuthState(isAuth?.isAuthenticated));
      dispatch(
        setUserProfile({
          email: isAuth?.auth?.idTokenParsed?.email,
          userId: isAuth?.auth?.idTokenParsed?.sub,
        }),
      );
      isAuth && localStorage.setItem('dstoken', isAuth?.isAuthenticated);
    };
    gets();
    setLoading(false);
  }, []);

  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    dispatch(setOpenLoginDialog(true));
  }

  function afterOpenModal() {}

  function closeModal() {
    dispatch(setOpenLoginDialog(false));
  }

  const loginVenly = async () => {
    console.log({ window });
    const ve = await venlyHelpers.login();

    console.log({ ve });
    if (ve === undefined) {
      alert('Login failed: check browser configuration');
      history.push('/login-issue');
      return;
    }

    const wallets = await venlyHelpers.getWallets();

    await updateUser(ve);

    if (ve.userId && ve?.email && ve?.wallets?.length >= 1) {
      dispatch(
        fetchLoggedInUser({
          Email: ve?.email,
          VenlyUID: ve?.userId,
          walletAddress: wallets[0].address,
        }),
      );
      dispatch(setUserAuthState(true));

      dispatch(
        setUserProfile({
          userId: ve?.userId,
          email: ve?.email,
          firstName: ve?.firstName,
          lastName: ve?.lastName,
          hasMasterPin: ve?.hasMasterPin,
          walletAddress: wallets[0].address,
        }),
      );

      dispatch(setOpenLoginDialog(false));
    }
  };

  const loginMetamask = function () {
    console.log('Login Metamask');
  };

  if (loading) {
    return <Loader />;
  }
  return (
    <div>
      <Header />
      <NavigationBar />
      <Modal
        isOpen={isOpenLoginDialogValue}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        contentLabel="Login Modal">
        <h1 className="top-heading-title">Login</h1>
        <hr className="horizontal-line" />
        <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
        <div style={{ textAlign: 'center' }}>
          <button onClick={loginVenly}>
            <img
              width="100px"
              height="100px"
              src={`${process.env.PUBLIC_URL}/images/venly.svg`}
              alt="venly"
            />
          </button>
          <button onClick={loginMetamask}>
            <img
              width="100px"
              height="100px"
              src={`${process.env.PUBLIC_URL}/images/metamask.svg`}
              alt="metamask"
            />
          </button>
          <div>
            <Button variant="dark" onClick={closeModal}>
              Cancel
            </Button>
          </div>
        </div>

        <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
      </Modal>
      <Switch>
        <Routes />
      </Switch>
      <div className="app-footer">
        <MainFooter />
      </div>
    </div>
  );
};

export default App;
