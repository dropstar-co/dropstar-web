import * as ActionTypes from "../actions/discover/types";

const INITIAL_STATE = {
  videoData: {
    videoUrl: "",
    videoTitle: "",
    videoAuthor: "",
  },
  currentVideoData: {},
};

const discoverReducer = (state = INITIAL_STATE, action) => {
  const { payload } = action;
  switch (action.type) {
    case ActionTypes.SET_VIDEO_DATA:
      return {
        videoData: {
          videoUrl: payload.url,
          videoTitle: payload.title,
          videoAuthor: payload.author,
        },
      };
    case ActionTypes.SET_CURRENT_VIDEO_DATA:
    return {
      ...state,
      currentVideoData: payload
    }
    default:
      return state;
  }
};

export default discoverReducer;
