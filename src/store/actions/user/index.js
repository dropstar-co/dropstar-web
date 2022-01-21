import * as actionTypes from "./types";

export const setUserAuth = (payload) => ({
  type: actionTypes.SET_USER_AUTH,
  payload,
});

export const setUserProfile = (payload) => ({
  type: actionTypes.SET_USER_PROFILE,
  payload,
});
