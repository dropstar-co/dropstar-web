import { combineReducers } from 'redux';
import discoverReducer from './discover';
import userReducer from './user';
import nftsReducer from './nfts';

export default combineReducers({
  user: userReducer,
  discover: discoverReducer,
  nfts: nftsReducer,
});
