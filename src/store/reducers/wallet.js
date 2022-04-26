import {
  SET_WALLET_TYPE,
  SET_OPEN_LOGIN_DIALOG,
  SET_OPEN_ASK_EMAIL_DIALOG,
} from '../actions/wallet/types';

const INITIAL_STATE = {
  isOpenLoginDialog: false,
  isOpenAskEmailDialog: false,
  walletType: '',
};

const walletReducer = (state = INITIAL_STATE, action) => {
  const { payload } = action;
  switch (action.type) {
    case SET_WALLET_TYPE:
      return {
        ...state,
        walletType: payload,
      };
    case SET_OPEN_LOGIN_DIALOG:
      return {
        ...state,
        isOpenLoginDialog: payload,
      };
    case SET_OPEN_ASK_EMAIL_DIALOG:
      return {
        ...state,
        isOpenAskEmailDialog: payload,
      };
    default:
      return state;
  }
};

export default walletReducer;
