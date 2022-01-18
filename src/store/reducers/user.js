import * as actionTypes from "../actions/user/types";


// user { 
//   userID: ()
//   firstName 
//   lastName 
//   email 
//   hasMasterPin
// }


// USER_LOADING  //  -  not too important
// USER_LOADED // 
// USER_LOGOUT  // 
// // LOAD_PROFILE  - 


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