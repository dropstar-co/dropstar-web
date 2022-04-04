import { SET_WALLET_TYPE, SET_OPEN_LOGIN_DIALOG } from '../actions/wallet/types';

const INITIAL_STATE = {
  isOpenLoginDialog: false,
  walletType: '',
};

const walletReducer = (state = INITIAL_STATE, action) => {
  const { payload } = action;
  switch (action.type) {
    case SET_WALLET_TYPE:
      return {
        walletType: payload,
      };
    case SET_OPEN_LOGIN_DIALOG:
      return {
        isOpenLoginDialog: payload,
      };
    default:
      return state;
  }
};

export default walletReducer;
