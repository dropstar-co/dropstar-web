import { VenlyConnect } from '@venly/connect';
import axios from 'axios';

const VENLY_WIDGET_CLIENT_ID =
  process.env.REACT_APP_NODE_ENV !== 'production'
    ? 'Testaccount'
    : process.env.REACT_APP_VENLY_WIDGET_CLIENT_ID;
const VENLY_CHAIN = 'MATIC';
const VENLY_ENVIRONMENT =
  process.env.REACT_APP_NODE_ENV !== 'production'
    ? 'staging'
    : process.env.REACT_APP_VENLY_ENVIRONMENT;

const venlyConnect = new VenlyConnect(VENLY_WIDGET_CLIENT_ID, {
  environment: VENLY_ENVIRONMENT,
  /*windowMode: 'REDIRECT',*/
});
const PSO_ADDRESS =
  process.env.REACT_APP_NODE_ENV !== 'production'
    ? '0xB7B70Cee97EDa8986b0885d8a481202EF1c839b4'
    : process.env.PSO_ADDRESS;

class venlyHelpers {
  static async login() {
    try {
      /*
      console.log('login');
      const loginObject = await venlyConnect.flows.authenticate({ windowMode: 'REDIRECT' });
      console.log({ loginObject });
      */

      const account = await venlyConnect.flows.getAccount(VENLY_CHAIN, { windowMode: 'REDIRECT' });
      console.log({ account });

      //alert(`Authenticated? ${account.isAuthenticated}`);

      if (account.auth === undefined) {
        throw 'Account.auth undefined';
      }

      const profile = await venlyConnect.api.getProfile();
      const wallets = await venlyConnect.api.getWallets({ secretType: VENLY_CHAIN });

      const ret = Object.assign(profile, { wallets, walletAddress: wallets[0].address });

      console.log({ ret });
      console.log('EEEEENDED');
      return ret;
    } catch (err) {
      console.log({ err });
      return undefined;
    }
  }

  static async claimNFT(saleVoucher) {
    const signer = await venlyConnect.createSigner();
    const wallets = await venlyConnect.api.getWallets({ secretType: VENLY_CHAIN });

    console.log({ wallets });

    //TODO: calculate the payable value

    console.log({ saleVoucher });

    const inputs = [
      { type: 'uint256', value: saleVoucher._id },
      { type: 'address', value: saleVoucher._tokenAddress },
      { type: 'uint256', value: saleVoucher._tokenId },
      { type: 'address', value: saleVoucher._holderAddress },
      { type: 'uint256', value: saleVoucher._price },
      { type: 'address', value: wallets[0].address },
      { type: 'address', value: saleVoucher._paymentRecipientAddress },
      { type: 'uint256', value: saleVoucher._startDate },
      { type: 'uint256', value: saleVoucher._deadline },

      {
        value: [
          {
            r: saleVoucher._signatures[0].r,
            s: saleVoucher._signatures[0].s,
            v: saleVoucher._signatures[0].v,
          },
        ],
      },
    ];

    console.log({ inputs });

    const parameters = {
      secretType: VENLY_CHAIN,
      walletId: wallets[0].id,
      to: PSO_ADDRESS,
      value: saleVoucher.AmountETH,
      functionName: 'fulfillBid',
      inputs,
    };

    console.log({ parameters });

    console.log(JSON.stringify(parameters, null, 2));

    signer.executeContract(parameters);
  }

  static async getWallets() {
    const wallets = await venlyConnect.api.getWallets({ secretType: VENLY_CHAIN });
    return wallets;
  }

  static async checkAuth() {
    console.log('checkAuth called');
    const checkingauth = await venlyConnect.checkAuthenticated();

    console.log({ checkingauth });

    checkingauth.authenticated(async function (auth) {
      console.log('Authenticated!!!');
      const callbackWallets = await venlyConnect.api.getWallets({ secretType: VENLY_CHAIN });
      console.log({ callbackWallets });
    });

    checkingauth.notAuthenticated(async function (auth) {
      console.log('Not authenticated!!!');
      console.log({ auth });
    });

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
