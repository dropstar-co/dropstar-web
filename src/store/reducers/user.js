import * as actionTypes from "../actions/user/types";

const INITIAL_STATE = {
  isUserAuthenticated: false,
  userProfile: {
    userId: "",
    email: "",
    firstName: "",
    lastName: "",
    hasMasterPin: false,
  },
};

const userReducer = (state = INITIAL_STATE, action) => {
  const { payload } = action;
  switch (action.type) {
    case actionTypes.SET_USER_AUTH_STATE:
      return {
        ...state,
        isUserAuthenticated: payload,
      };
    case actionTypes.FETCH_LOGGED_IN_USER:
      return {
        ...state,
        userProfile: {...state.userProfile, ...payload},
      };
    case actionTypes.SET_USER_PROFILE:
      return {
        ...state,
        userProfile: {
          userId: payload.userId,
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
