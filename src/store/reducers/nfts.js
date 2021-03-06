import * as ActionTypes from '../actions/nfts/types';

const INITIAL_STATE = {
  status: 'initial',
  nftsBids: [],
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
    case ActionTypes.SET_NFTS_BIDS:
      return {
        ...state,
        nftsBids: payload,
      };
    case ActionTypes.SET_NFTS:
      return {
        ...state,
        nfts: payload,
      };
    case ActionTypes.UPDATE_NFT_BIDS:
      return {
        ...state,
        nftsBids: [payload, ...state.nftsBids],
      };
    default:
      return state;
  }
};

export default nftsReducer;
