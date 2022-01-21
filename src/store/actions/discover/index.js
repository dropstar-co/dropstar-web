import * as ActionTypes from "./types";
import axios from "axios";
import axiosPayload from "../../../utils/api";
import { BASE_URL } from "../../../utils/constant";

export const setStatus = (payload) => ({
  type: ActionTypes.SET_STATUS,
  payload,
});

export const setLoading = (payload) => ({
  type: ActionTypes.SET_LOADING,
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
      dispatch(setLoading(true));
      const response = await axios(
        axiosPayload(`${BASE_URL}discover`, "", "get")
      );
      dispatch(setStatus("fetching"));
      if (response && response.status === 200) {
        dispatch(setLoading(false));
        dispatch(setStatus("completed"));
        dispatch(setArtists(response.data.data));
        dispatch(setCurrentArtist(response.data.data[0]));
      }
    } catch (error) {
      dispatch(setLoading(false));
      dispatch(setStatus("error"));
    }
  };
};
