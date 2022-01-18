import * as ActionTypes from "./types";

export const setVideoData = (payload) => ({
  type: ActionTypes.SET_VIDEO_DATA,
  payload,
});

export const setCurrentVideoData = (payload) => ({
  type: ActionTypes.SET_CURRENT_VIDEO_DATA,
  payload,
});
