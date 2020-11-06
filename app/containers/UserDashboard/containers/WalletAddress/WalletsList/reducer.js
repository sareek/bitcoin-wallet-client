import { fromJS } from "immutable";
import * as types from "./constants";

const initialState = fromJS({
  requesting: false,
  success: false,
  walletAddressesResponse: null,
  postAddressResponse: null,
  error: null
});

function walletsListReducer(state = initialState, action) {
  switch (action.type) {
    case types.GET_ADDRESS_REQUEST:
      return state.merge({
        requesting: true,
        error: null,
        walletAddressesResponse: null,
        success: false
      });
    case types.GET_ADDRESS_SUCCESS:
      return state.merge({
        requesting: false,
        error: null,
        walletAddressesResponse: action.response,
        success: true
      });
      
    case types.GET_ADDRESS_FAILURE:
      return state.merge({
        requesting: false,
        walletAddressesResponse: null,
        error: action.error.message,
        success: false
      });
      case types.POST_WALLET_ADDRESS_REQUEST:
      return state.merge({
        requesting: true,
        error: null,
        postAddressResponse: null,
        success: false
      });
    case types.POST_WALLET_ADDRESS_SUCCESS:
      return state.merge({
        requesting: false,
        error: null,
        postAddressResponse: action.response,
        success: true
      });
      
    case types.POST_WALLET_ADDRESS_FAILURE:
      return state.merge({
        requesting: false,
        postAddressResponse: null,
        error: action.error.message,
        success: false
      });  
    case types.CLEAR_STATE:
      return initialState;
    default:
      return state;
  }
}

export default walletsListReducer;
