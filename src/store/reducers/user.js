import * as actionTypes from "../actions/user/types";

const INITIAL_STATE = {
  isAuthenticated: false,
  userProfile: {
    email: "",
    firstName: "",
    lastName: "",
    hasMasterPin: false,
  },
};

const userReducer = (state = INITIAL_STATE, action) => {
  const { payload } = action;
  switch (action.type) {
    case actionTypes.SET_USER_AUTH:
      return {
        ...state,
        isAuthenticated: payload,
      };
    case actionTypes.SET_USER_PROFILE:
      return {
        ...state,
        userProfile: {
          email: payload.email,
          firstName: payload.firstName,
          lastName: payload.lastName,
          hasMasterPin: payload.hasMasterPin,
        },
      };
    default:
      return state;
  }
};

export default userReducer;
