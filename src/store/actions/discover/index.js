import * as ActionTypes from "./types";

import { BASE_URL } from "../../../utils/constant";
import axios from "axios";
import axiosPayload from "../../../utils/api";
import { setAppLoading } from "../appLoader";

export const setStatus = (payload) => ({
  type: ActionTypes.SET_STATUS,
  payload,
});

export const setArtists = (payload) => ({
  type: ActionTypes.SET_ARTISTS,
  payload,
});
export const setCurrentArtist = (payload) => ({
  type: ActionTypes.SET_CURRENT_ARTIST,
  payload,
});

export const fetchArtists = () => {
  return async (dispatch) => {
    try {
      dispatch(setAppLoading(true));
      const response = await axios(
        axiosPayload(`${BASE_URL}nft/discover`, "", "get")
      );
      dispatch(setStatus("fetching"));
      if (response && response.status === 200) {
        dispatch(setAppLoading(false));
        dispatch(setStatus("completed"));
        dispatch(setArtists(response.data.data));
        dispatch(setCurrentArtist(response.data.data[0]));
      }
    } catch (error) {
      dispatch(setAppLoading(false));
      dispatch(setStatus("error"));
    }
  };
};
