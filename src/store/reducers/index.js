import { combineReducers } from 'redux';
import discoverReducer from './discover';
import userReducer from './user';

export default combineReducers({
  user: userReducer,
  discover: discoverReducer
});
