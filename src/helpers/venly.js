import { VenlyConnect, WindowMode } from "@venly/connect";
import axios from 'axios';
class venlyHelpers {
  static async login() {
    const venlyConnect = new VenlyConnect("Testaccount", {
      environment: "staging",
    });
    const loginObject = await venlyConnect.flows.authenticate();
    const wallets = await venlyConnect.api.getProfile();
    return wallets;
  }

  static async loadProfile() {
    const venlyConnect = new VenlyConnect("Testaccount", {
      environment: "staging",
    });
    await venlyConnect.flows.authenticate();
    const wallets = await venlyConnect.api.getProfile();
    return wallets;
  }

  static async checkAuth() {

    const venlyConnect = new VenlyConnect("Testaccount", {
      environment: "staging",
    });
    const checkingauth = await venlyConnect.checkAuthenticated();
    return checkingauth;
  }
  static async logOut() {
    const venlyConnect = new VenlyConnect("Testaccount", {
      environment: "staging",
    });
    localStorage.removeItem('dstoken')
    const  authObj = venlyConnect.checkAuthenticated()
    await (await authObj).auth.clearToken()
    await venlyConnect.logout({ windowMode: 'REDIRECT' });
    return await venlyConnect.logout();
  }
}

export default venlyHelpers;
