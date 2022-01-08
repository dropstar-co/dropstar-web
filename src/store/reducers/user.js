import * as actionTypes from "../actions/user/types";

const INITIAL_STATE = {
  status: "initial",
  loading: false,
};

const userReducer = (state = INITIAL_STATE, action) => {
  const { payload } = action;
  switch (action.type) {
    case actionTypes.SET_STATUS:
      return {
        ...state,
        status: payload,
      };
    default:
      return state;
  }
};

export default userReducer;