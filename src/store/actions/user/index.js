import * as actionTypes from "./types";

import { BASE_URL } from "../../../utils/constant";
import axios from "axios";
import axiosPayload from "../../../utils/api";

export const setUserAuthState = (payload) => ({
  type: actionTypes.SET_USER_AUTH_STATE,
  payload,
});

export const setUserProfile = (payload) => ({
  type: actionTypes.SET_USER_PROFILE,
  payload,
});

export const setLoggedInUserData = payload => ({
  type: actionTypes.FETCH_LOGGED_IN_USER,
  payload,
})
export const getUserBidsI = payload => ({
  type: actionTypes.GET_USER_BIDS,
  payload,
})

export const fetchLoggedInUser = (data) => {
  return async (dispatch) => {
    try {
      const response = await axios(
        axiosPayload(`${BASE_URL}user/info`, data, "post")
      );

      if (response && response.status === 200) {
        dispatch(setLoggedInUserData(response.data.data))
      }
    } catch (error) {
     console.log(error);
    }
  };
};

export const getUserBids = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios(
        axiosPayload(`${BASE_URL}user/bids/${id}`,  "get")
      );
      if (response && response.status === 200) {
        console.log(response, "my response")
        dispatch(getUserBidsI(response.data.data))
      }
    } catch (error) {
      console.log('logging my error')
    }
  };
};

