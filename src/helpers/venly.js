import { VenlyConnect, WindowMode } from '@venly/connect';
import axios from 'axios';

const VENLY_WIDGET_CLIENT_ID = 'Testaccount';
const VENLY_CHAIN = 'MATIC';
const VENLY_ENVIRONMENT = 'staging';
const venlyConnect = new VenlyConnect(VENLY_WIDGET_CLIENT_ID, {
  environment: VENLY_ENVIRONMENT,
});

class venlyHelpers {
  static async checkAuthenticated() {
    const result = await venlyConnect.checkAuthenticated();
    result.authenticated(async function (auth) {
      const wallets = await venlyConnect.api.getWallets({ secretType: VENLY_CHAIN });
    });
  }

  static init() {
    venlyHelpers.checkAuthenticated();
  }

  static async connect(venlyConnect) {
    try {
      const account = await venlyConnect.flows.getAccount(VENLY_CHAIN);
    } catch (error) {
      console.log(error);
    }
  }

  static async login() {
    const loginObject = await venlyConnect.flows.authenticate();
    const wallets = await venlyConnect.api.getProfile();
    return wallets;
  }

  static async loadProfile() {
    await venlyConnect.flows.authenticate();
    const wallets = await venlyConnect.api.getProfile();
    return wallets;
  }

  static async checkAuth() {
    const checkingauth = await venlyConnect.checkAuthenticated();
    return checkingauth;
  }
  static async logOut() {
    localStorage.removeItem('dstoken');
    const authObj = venlyConnect.checkAuthenticated();
    await (await authObj).auth.clearToken();
    await venlyConnect.logout({ windowMode: 'REDIRECT' });
    return await venlyConnect.logout();
  }
}

export default venlyHelpers;
