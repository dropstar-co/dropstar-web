import * as actionTypes from "./types";

export const setUserAuthState = (payload) => ({
  type: actionTypes.SET_USER_AUTH_STATE,
  payload,
});

export const setUserProfile = (payload) => ({
  type: actionTypes.SET_USER_PROFILE,
  payload,
});
