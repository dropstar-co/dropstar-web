import { VenlyConnect, WindowMode } from '@venly/connect';
import axios from 'axios';

const VENLY_WIDGET_CLIENT_ID = process.env.NODE_ENV !== "production" ?  'Testaccount' : process.env.REACT_APP_VENLY_WIDGET_CLIENT_ID ;
const VENLY_CHAIN = process.env.NODE_ENV !== 'MATIC' 
const VENLY_ENVIRONMENT = process.env.NODE_ENV !== "production" ? 'staging': process.env.REACT_APP_VENLY_ENVIRONMENT;
const venlyConnect = new VenlyConnect(VENLY_WIDGET_CLIENT_ID, {
  environment: VENLY_ENVIRONMENT,
});

class venlyHelpers {
  static async connect(venlyConnect) {
    const account = await venlyConnect.flows.getAccount(VENLY_CHAIN);
    return account;
  }

  static async login() {
    const loginObject = await venlyConnect.flows.authenticate();
    const account = await venlyConnect.flows.getAccount(VENLY_CHAIN);
    const profile = await venlyConnect.api.getProfile();
    const wallets = await venlyConnect.api.getWallets({ secretType: VENLY_CHAIN });

    const ret = Object.assign(profile, { wallets });
    return ret;
  }

  static async loadProfile() {
    const loginObject = await venlyConnect.flows.authenticate();
    const profile = await venlyConnect.api.getProfile();
    const wallets = await venlyConnect.api.getWallets({ secretType: VENLY_CHAIN });

    const ret = Object.assign(profile, { wallets });
    return ret;
  }

  static async checkAuth() {
    const checkingauth = await venlyConnect.checkAuthenticated();
    return checkingauth;
  }
  static async logOut() {
    localStorage.removeItem('dstoken');
    localStorage.removeItem('userId');
    const authObj = venlyConnect.checkAuthenticated();
    await (await authObj).auth.clearToken();
    await venlyConnect.logout({ windowMode: 'REDIRECT' });
    return await venlyConnect.logout();
  }
}

export default venlyHelpers;
