import * as actionTypes from './types';

import { BASE_URL } from '../../../utils/constant';
import axios from 'axios';
import axiosPayload from '../../../utils/api';

export const setUserAuthState = payload => ({
  type: actionTypes.SET_USER_AUTH_STATE,
  payload,
});

export const setUserProfile = payload => ({
  type: actionTypes.SET_USER_PROFILE,
  payload,
});

export const setLoggedInUserData = payload => ({
  type: actionTypes.FETCH_LOGGED_IN_USER,
  payload,
});
export const getUserBidsI = payload => ({
  type: actionTypes.GET_USER_BIDS,
  payload,
});

export const fetchLoggedInUser = data => {
  return async dispatch => {
    try {
      const response = await axios(axiosPayload(`${BASE_URL}user/info`, data, 'post'));
      if (response && response.status === 200) {
        console.log(response.data.data);
        localStorage.setItem('userId', response.data.data.id);
        dispatch(setLoggedInUserData(response.data.data));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const getUserBids = id => {
  return async dispatch => {
    try {
      const response = await axios(axiosPayload(`${BASE_URL}user/bids/${id}`, 'get'));
      if (response && response.status === 200) {
        dispatch(getUserBidsI(response.data.data));
      }
    } catch (error) {
      console.log('logging my error');
    }
  };
};

export const updateUser = async data => {
  console.log('updateUser');
  console.log({ data });
  try {
    const response = await axios(
      axiosPayload(
        `${BASE_URL}/user/update`,
        {
          VenlyUID: data.userId,
          Email: data.email,
          walletAddress: data.walletAddress,
        },
        'post',
      ),
    );

    if (response && response.status >= 200 && response.status < 300) {
      console.log('updateUser ' + response.status);
    } else {
      console.log('updateUser errored');
      console.log({ response });
    }
  } catch (error) {
    console.log('logging my error');
  }
};
