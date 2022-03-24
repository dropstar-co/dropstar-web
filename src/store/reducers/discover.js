import * as ActionTypes from "../actions/discover/types";

const INITIAL_STATE = {
  status: "initial",
  loading: false,
  artists: [],
  currentArtist: {},
};

const discoverReducer = (state = INITIAL_STATE, action) => {
  const { payload } = action;
  switch (action.type) {
    case ActionTypes.SET_STATUS:
      return {
        ...state,
        status: payload,
      };
    case ActionTypes.SET_LOADING:
      return {
        ...state,
        loading: payload,
      };
    case ActionTypes.SET_ARTISTS:
      return {
        ...state,
        artists: payload,
      };
    case ActionTypes.SET_CURRENT_ARTIST:
      return {
        ...state,
        currentArtist: payload,
      };
    default:
      return state;
  }
};

export default discoverReducer;
