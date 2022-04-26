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
      const account = await venlyConnect.flows.getAccount(VENLY_CHAIN, { windowMode: 'REDIRECT' });
      if (account.auth === undefined) {
        throw 'Account.auth undefined';
      }
      const profile = await venlyConnect.api.getProfile();
      const wallets = await venlyConnect.api.getWallets({ secretType: VENLY_CHAIN });
      const ret = Object.assign(profile, { wallets, walletAddress: wallets[0].address });
      return ret;
    } catch (err) {
      console.err({ err });
      return undefined;
    }
  }

  static async claimNFT(saleVoucher) {
    const signer = await venlyConnect.createSigner();
    const wallets = await venlyConnect.api.getWallets({ secretType: VENLY_CHAIN });

    //TODO: calculate the payable value

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

    const parameters = {
      secretType: VENLY_CHAIN,
      walletId: wallets[0].id,
      to: PSO_ADDRESS,
      value: saleVoucher.AmountETH,
      functionName: 'fulfillBid',
      inputs,
    };

    signer.executeContract(parameters);
  }

  static async getWallets() {
    const wallets = await venlyConnect.api.getWallets({ secretType: VENLY_CHAIN });
    return wallets;
  }

  static async checkAuth() {
    const checkingauth = await venlyConnect.checkAuthenticated();

    checkingauth.authenticated(async function (auth) {
      const callbackWallets = await venlyConnect.api.getWallets({ secretType: VENLY_CHAIN });
    });

    checkingauth.notAuthenticated(async function (auth) {
      console.err('Not authenticated!!!');
    });

    return checkingauth;
  }
  static async logOut() {
    console.log('delete dstokena dn userId because venly logout was called');
    localStorage.removeItem('dstoken');
    localStorage.removeItem('userId');
    const authObj = venlyConnect.checkAuthenticated();
    await (await authObj).auth.clearToken();
    await venlyConnect.logout({ windowMode: 'REDIRECT' });
    return await venlyConnect.logout();
  }
}

export default venlyHelpers;
