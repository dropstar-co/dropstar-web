import { SET_WALLET_TYPE, SET_OPEN_LOGIN_DIALOG, SET_OPEN_ASK_EMAIL_DIALOG } from './types';

export const setWalletType = payload => {
  console.log(`setWalletType: ${payload}`);
  return {
    type: SET_WALLET_TYPE,
    payload,
  };
};

export const setOpenLoginDialog = payload => ({
  type: SET_OPEN_LOGIN_DIALOG,
  payload,
});

export const setOpenAskEmailDialog = payload => ({
  type: SET_OPEN_ASK_EMAIL_DIALOG,
  payload,
});
