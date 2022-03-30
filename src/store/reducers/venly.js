import * as actionTypes from '../actions/venly/types';

const INITIAL_STATE = {};

const venlyReducer = (state = INITIAL_STATE, action) => {
  const { payload } = action;
  switch (action.type) {
    case actionTypes.SET_VENLY_PARAMS:
      return {
        ...state,
        venlyParams: payload,
      };
    default:
      return state;
  }
};

export default venlyReducer;
