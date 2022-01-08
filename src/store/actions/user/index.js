import * as actionTypes from "./types";

export const setStatus = (payload) => ({
  type: actionTypes.SET_STATUS,
  payload,
});