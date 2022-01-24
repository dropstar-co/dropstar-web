import * as ActionTypes from "./types";

import { BASE_URL } from "../../../utils/constant";
import axios from "axios";
import axiosPayload from "../../../utils/api";
import { setAppLoading } from "../appLoader";

export const setNftStatus = (payload) => ({
  type: ActionTypes.SET_NFTS_STATUS,
  payload,
});

export const setNfts = (payload) => ({
  type: ActionTypes.SET_NFTS,
  payload,
});

export const setNftsBids = (payload) => ({
  type: ActionTypes.SET_NFTS_BIDS,
  payload,
});

export const fetchNfts = (nftId) => {
  return async (dispatch) => {
    try {
      dispatch(setAppLoading(true));
      const response = await axios(
        axiosPayload(`${BASE_URL}nft/${nftId}`, "", "get")
      );
      dispatch(setNftStatus("fetching"));
      if (response && response.status === 200) {
        dispatch(setAppLoading(false));
        dispatch(setNftStatus("completed"));
        dispatch(setNfts(response.data.data));
      }
    } catch (error) {
      dispatch(setAppLoading(false));
      dispatch(setNftStatus("error"));
    }
  };
};

export const fetchNftsBids = (nftId) => {
  return async (dispatch) => {
    try {
      dispatch(setAppLoading(true));
      const response = await axios(
        axiosPayload(`${BASE_URL}bid/nft/${nftId}`, "", "get")
      );
      dispatch(setNftStatus("fetching"));
      if (response && response.status === 200) {
        dispatch(setAppLoading(false));
        dispatch(setNftStatus("completed"));
        dispatch(setNftsBids(response.data.data));
      }
    } catch (error) {
      dispatch(setAppLoading(false));
      dispatch(setNftStatus("error"));
    }
  };
};

export const postBid = (data) => {
  return async (dispatch) => {
    try {
      const response = await axios(
        axiosPayload(`${BASE_URL}bid/complete`, data, "post")
      );
      dispatch(setNftStatus("posting"));
      if (response && response.status === 200) {
        dispatch(setNftStatus("completed"));
      }
    } catch (error) {
      dispatch(setAppLoading(false));
      dispatch(setNftStatus("error"));
    }
  };
};
