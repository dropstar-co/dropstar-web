import appLoadingReducer from './app';
import { combineReducers } from 'redux';
import discoverReducer from './discover';
import nftsReducer from './nfts';
import userReducer from './user';

export default combineReducers({
  user: userReducer,
  discover: discoverReducer,
  nfts: nftsReducer,
  loader: appLoadingReducer,
});
