import * as ActionTypes from "../actions/nfts/types";

const INITIAL_STATE = {
  status: "initial",
  nfts: {},
};

const nftsReducer = (state = INITIAL_STATE, action) => {
  const { payload } = action;
  switch (action.type) {
    case ActionTypes.SET_NFTS_STATUS:
      return {
        ...state,
        status: payload,
      };
    case ActionTypes.SET_NFTS:
      return {
        ...state,
        nfts: payload,
      };
    default:
      return state;
  }
};

export default nftsReducer;
