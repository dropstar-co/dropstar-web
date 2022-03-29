import * as actionTypes from './types';

import { BASE_URL } from '../../../utils/constant';
import axios from 'axios';
import axiosPayload from '../../../utils/api';

export const setUpdateSaleVouchers = payload => ({
  type: actionTypes.UPDATE_SALE_VOUCHERS,
  payload,
});

export const fetchBidSaleVoucher = async bidId => {
  console.log('fetchBidSaleVoucher');
  try {
    const responseSaleVoucher = await axios(axiosPayload(`${BASE_URL}salevoucher/${bidId}`, 'get'));

    const res = responseSaleVoucher.data.data[0];

    console.log({ responseSaleVoucher });
    return res;
  } catch (error) {
    console.log(error);
  }
};
