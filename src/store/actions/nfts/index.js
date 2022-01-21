import * as ActionTypes from "./types";
import axios from "axios";
import axiosPayload from "../../../utils/api";
import { BASE_URL } from "../../../utils/constant";

export const setNftStatus = (payload) => ({
  type: ActionTypes.SET_NFTS_STATUS,
  payload,
});

export const setNftLoading = (payload) => ({
  type: ActionTypes.SET_NFTS_LOADING,
  payload,
});
export const setNfts = (payload) => ({
  type: ActionTypes.SET_NFTS,
  payload,
});

export const fetchNfts = (nftId) => {
  return async (dispatch) => {
    try {
      dispatch(setNftLoading(true));
      const response = await axios(
        axiosPayload(`${BASE_URL}/nfts/${nftId}`, "", "get")
      );
      dispatch(setNftStatus("fetching"));
      if (response && response.status === 200) {
        dispatch(setNftLoading(false));
        dispatch(setNftStatus("completed"));
        dispatch(setNfts(response.data.data));
      }
    } catch (error) {
      dispatch(setNftLoading(false));
      dispatch(setNftStatus("error"));
    }
  };
};
