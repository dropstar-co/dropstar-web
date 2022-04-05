import {
  setUserAuthState,
  setUserProfile,
  updateUser,
  fetchLoggedInUser,
} from './store/actions/user';
import { setOpenLoginDialog, setWalletType, setOpenAskEmailDialog } from './store/actions/wallet';
import { setLoggedInUserData } from './store/actions/user';
import { useEffect, useState } from 'react';

import Header from './components/header/Header';
import Loader from './pages/Spinner';
import MainFooter from './pages/desktop-footer/MainFooter';
import NavigationBar from './components/navigation-bar/NavigationBar';
import Routes from './Routes';
import { Switch, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import venlyHelpers from './helpers/venly';

import { Button, Form } from 'react-bootstrap';
import Modal from 'react-modal';

import { isOpenLoginDialog, isOpenAskEmailDialog, getWalletType } from './store/selectors/wallet';
import axios from 'axios';
import axiosPayload from './utils/api';
import { BASE_URL } from './utils/constant';

import WalletConnectProvider from '@walletconnect/web3-provider';

const App = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const isOpenLoginDialogValue = useSelector(isOpenLoginDialog);
  const isOpenAskEmailDialogValue = useSelector(isOpenAskEmailDialog);
  const walletTypeSelector = useSelector(getWalletType);
  const [metamaskEmail, setMetamaskEmail] = useState('');
  const [walletAddress, setWalletAddress] = useState('');

  console.log(`walletTypeSelector: ${walletTypeSelector}`);

  useEffect(() => {
    setLoading(true);
    const gets = async () => {
      const walletTypeLS = localStorage.getItem('walletType');
      if (!walletTypeLS || walletTypeLS === '') {
        return;
      }
      dispatch(setWalletType(walletTypeLS));

      if (walletTypeLS === 'venly') {
        const isAuth = await venlyHelpers.checkAuth();

        console.log(`localStorage.getItem('walletType') ${localStorage.getItem('walletType')}`);
        if (isAuth.isAuthenticated) {
          dispatch(setUserAuthState(isAuth?.isAuthenticated));
          dispatch(
            setUserProfile({
              email: isAuth?.auth?.idTokenParsed?.email,
              userId: isAuth?.auth?.idTokenParsed?.sub,
            }),
          );
          isAuth && localStorage.setItem('dstoken', isAuth?.isAuthenticated);
        } else {
          localStorage.removeItem('walletType');
        }

        return;
      }

      if (localStorage.getItem('walletType') === 'metamask') {
        console.log('Login with Metamask wallet detected');
        dispatch(setWalletType('metamask'));
        handleMetamaskLoginSelected();
        return;
      }

      if (localStorage.getItem('walletType') === 'walletconnect') {
        console.log('Login with walletconnect wallet detected');
        dispatch(setWalletType('walletconnect'));
        handleWalletConnectLoginSelected();
        return;
      }

      alert(`Wallet type '${walletTypeLS}' not recognised`);
    };
    gets();
    setLoading(false);
  }, []);

  const loginVenly = async () => {
    console.log({ window });
    const ve = await venlyHelpers.login();

    console.log({ ve });
    if (ve === undefined) return;

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

      dispatch(setWalletType('venly'));
      dispatch(setOpenLoginDialog(false));
    }
    localStorage.setItem('walletType', 'venly');
  };

  const handleMetamaskLoginSelected = async function () {
    const ethers = require('ethers');
    console.log({ ethers });

    if (window.ethereum === undefined) {
      alert('You do not have metamask installed...');
      localStorage.removeItem('walletType');
      return;
    }

    if (typeof window.ethereum !== 'undefined') {
      window.ethereum.on('chainChanged', chainId => {
        window.location.reload();
      });
      window.ethereum.enable();
    } else return;

    console.log('Create write provider');
    const provider = new ethers.providers.Web3Provider(window.ethereum, 'any');
    console.log('created');
    const accounts = await provider.send('eth_requestAccounts', []);

    const walletAddress = accounts[0];

    setWalletAddress(walletAddress);

    //TODO
    //dispatch(setMetamaskSigner(provider));

    try {
      await fetchUserByWalletAddressAndUpdateState(walletAddress);

      dispatch(setWalletType('metamask'));
    } catch (err) {
      dispatch(setOpenAskEmailDialog(true));
    }

    dispatch(setOpenLoginDialog(false));
  };

  const handleLoginMailProvided = async () => {
    const ethers = require('ethers');
    const walletAddressUser = ethers.utils.getAddress(walletAddress);

    const response = await axios(
      axiosPayload(
        `${BASE_URL}user/info`,
        {
          Email: metamaskEmail,
          VenlyUID: walletAddress,
          walletAddress,
        },
        'post',
      ),
    );
    if (response && response.status === 201) {
      console.log({ response });

      localStorage.setItem('userId', response.data.user.id);
      localStorage.setItem('walletType', 'metamask');
    } else {
      console.log({ response });
      throw 'Errored when creating user';
    }

    dispatch(setUserAuthState(true));

    const ve = {
      email: walletAddressUser.substr(0, 6) + '...' + walletAddressUser.substr(38),
      userId: walletAddress,
      firstName: walletAddress,
      lastName: walletAddress,
      hasMasterPin: false,
    };

    dispatch(
      setUserProfile({
        userId: ve?.userId,
        email: ve?.email,
        firstName: ve?.firstName,
        lastName: ve?.lastName,
        hasMasterPin: ve?.hasMasterPin,
        walletAddress,
      }),
    );

    dispatch(setOpenAskEmailDialog(false));
  };

  const handleWalletConnectLoginSelected = async () => {
    //  Create WalletConnect Provider
    const infuraId = 'da4d287fc28a4607a1e7e8803609f22d';
    const provider = new WalletConnectProvider({
      infuraId,
      rpc: {
        1: `https://mainnet.infura.io/v3/${infuraId}`,
        42: `https://kovan.infura.io/v3/${infuraId}`,
        137: `https://polygon-mainnet.infura.io/v3/${infuraId}`,
        80001: 'https://rpc-mumbai.matic.today',
      },
    });

    //  Enable session (triggers QR Code modal)
    let accounts;
    try {
      accounts = await provider.enable();
    } catch (error) {
      console.error(error);
      return;
    }

    const walletAddress = accounts[0];

    setWalletAddress(walletAddress);

    //TODO
    //dispatch(setMetamaskSigner(provider));

    try {
      await fetchUserByWalletAddressAndUpdateState(walletAddress, 'walletconnect');
    } catch (err) {
      dispatch(setOpenAskEmailDialog(true));
    }

    dispatch(setOpenLoginDialog(false));
  };

  async function fetchUserByWalletAddressAndUpdateState(walletAddress, walletType) {
    const response = await axios(
      axiosPayload(`${BASE_URL}user/wallet/${walletAddress}`, '', 'get'),
    );

    localStorage.setItem('userId', response.data.data.id);
    localStorage.setItem('walletType', walletType);
    dispatch(setWalletType(walletType));

    console.log({ user: response.data.data });
    dispatch(setLoggedInUserData(response.data.data));

    dispatch(setUserAuthState(true));

    const ethers = require('ethers');
    console.log({ ethers });
    const walletAddressUser = ethers.utils.getAddress(walletAddress);
    const ve = {
      email: walletAddressUser.substr(0, 6) + '...' + walletAddressUser.substr(38),
      userId: walletAddress,
      firstName: walletAddress,
      lastName: walletAddress,
      hasMasterPin: false,
    };

    dispatch(
      setUserProfile({
        userId: ve?.userId,
        email: ve?.email,
        firstName: ve?.firstName,
        lastName: ve?.lastName,
        hasMasterPin: ve?.hasMasterPin,
        walletAddress,
      }),
    );
  }

  const closeWalletDialog = () => dispatch(setOpenLoginDialog(false));
  const closeAskEmailDialog = () => dispatch(setOpenAskEmailDialog(false));

  const validateEmail = email => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      );
  };

  if (loading) {
    return <Loader />;
  }
  return (
    <div>
      <Header />
      <NavigationBar />

      <Modal
        appElement={document.getElementById('root') || undefined}
        isOpen={isOpenAskEmailDialogValue}
        onAfterOpen={() => ''}
        onRequestClose={closeAskEmailDialog}
        contentLabel="Ask Email Modal">
        <h1 className="top-heading-title">Login</h1>
        <hr className="horizontal-line" />
        <p>Input your email* to be notified about updates on the auctions you participate in.</p>
        <div className="ms-4 py-2 pe-md-5">
          <Form>
            <Form.Group>
              <Form.Control
                type="email"
                placeholder="Type your email"
                onChange={e => setMetamaskEmail(e.target.value)}
              />
            </Form.Group>
          </Form>
          <Button
            variant="dark"
            onClick={handleLoginMailProvided}
            disabled={!validateEmail(metamaskEmail)}>
            Proceed
          </Button>
        </div>
      </Modal>
      <Modal
        appElement={document.getElementById('root') || undefined}
        isOpen={isOpenLoginDialogValue}
        onAfterOpen={() => ''}
        onRequestClose={closeWalletDialog}
        contentLabel="Login Modal">
        <h1 className="top-heading-title">Login</h1>
        <hr className="horizontal-line" />
        <div style={{ textAlign: 'center' }}>
          <button onClick={loginVenly}>
            <img
              width="100px"
              height="100px"
              src={`${process.env.PUBLIC_URL}/images/venly.svg`}
              alt="venly"
            />
          </button>
          <button onClick={handleMetamaskLoginSelected}>
            <img
              width="100px"
              height="100px"
              src={`${process.env.PUBLIC_URL}/images/metamask.svg`}
              alt="metamask"
            />
          </button>
          <button onClick={handleWalletConnectLoginSelected}>
            <img
              width="100px"
              height="100px"
              src={`${process.env.PUBLIC_URL}/images/walletconnect.svg`}
              alt="wallet connect"
            />
          </button>
          <div>
            <Button variant="dark" onClick={closeWalletDialog}>
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
