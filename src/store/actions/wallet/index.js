import { SET_WALLET_TYPE, SET_OPEN_LOGIN_DIALOG } from './types';

export const setWalletType = payload => ({
  type: SET_WALLET_TYPE,
  payload,
});

export const setOpenLoginDialog = payload => ({
  type: SET_OPEN_LOGIN_DIALOG,
  payload,
});
