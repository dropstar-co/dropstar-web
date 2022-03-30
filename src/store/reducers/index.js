import appLoadingReducer from './app';
import { combineReducers } from 'redux';
import discoverReducer from './discover';
import nftsReducer from './nfts';
import userReducer from './user';
import venlyReducer from './venly';

export default combineReducers({
  user: userReducer,
  discover: discoverReducer,
  nfts: nftsReducer,
  loader: appLoadingReducer,
  venly: venlyReducer,
});
