import { SET_APP_LOADING } from '../actions/appLoader/types';

const INITIAL_STATE = {
  loading: false,
};

const appLoadingReducer = (state = INITIAL_STATE, action) => {
  const { payload } = action;
  switch (action.type) {
    case SET_APP_LOADING:
      return {
       loading: payload
      };
    default:
      return state;
  }
};

export default appLoadingReducer;
