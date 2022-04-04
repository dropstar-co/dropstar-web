import appLoadingReducer from './app';
import { combineReducers } from 'redux';
import discoverReducer from './discover';
import nftsReducer from './nfts';
import userReducer from './user';
import walletReducer from './wallet';

export default combineReducers({
  user: userReducer,
  discover: discoverReducer,
  nfts: nftsReducer,
  loader: appLoadingReducer,
  wallet: walletReducer,
});
