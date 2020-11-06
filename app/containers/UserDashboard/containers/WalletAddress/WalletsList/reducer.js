import { fromJS } from "immutable";
import * as types from "./constants";

const initialState = fromJS({
  requesting: false,
  success: false,
  response: null,
  error: null
});

function walletsListReducer(state = initialState, action) {
  switch (action.type) {
    // case types.GET_ADDRESS_REQUEST:
    //   return state.merge({
    //     requesting: true,
    //     error: null,
    //     response: null,
    //     success: false
    //   });
    // case types.GET_ADDRESS_SUCCESS:
    //   return state.merge({
    //     requesting: false,
    //     error: null,
    //     response: action.response.message,
    //     success: true
    //   });
      
    // case types.GET_ADDRESS_FAILURE:
    //   return state.merge({
    //     requesting: false,
    //     response: null,
    //     error: action.error.message,
    //     success: false
    //   });
    case types.BASIC_INFO_CLEAR_STATE:
      return initialState;
    default:
      return state;
  }
}

export default walletsListReducer;
