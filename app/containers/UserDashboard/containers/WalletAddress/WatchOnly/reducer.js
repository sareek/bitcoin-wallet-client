import { fromJS } from "immutable";
import * as type from "./constants";
import { LOGOUT_SUCCESS } from "containers/Login/constants";

const initialState = fromJS({
  requesting: false,
  getWatchOnlyWalletAddressRequesting: false,
  postWatchOnlyWalletAddressRequesting: false,
  success: false,
  watchOnlyAddressResponse: null,
  generateWatchOnlyAddressResponse: null,
  error: null
});

function passwordReducer(state = initialState, action) {
  switch (action.type) {
    case type.GET_WATCHONLY_ADDRESS_REQUEST:
      return state.merge({
        getWatchOnlyWalletAddressRequesting: true,
        error: null,
        watchOnlyAddressResponse: null,
        success: false
      });
    case type.GET_WATCHONLY_ADDRESS_SUCCESS:
      return state.merge({
        getWatchOnlyWalletAddressRequesting: false,
        watchOnlyAddressResponse: action.response,
        error: null,
        success: true
      });
    case type.GET_WATCHONLY_ADDRESS_FAILURE:
      return state.merge({
        getWatchOnlyWalletAddressRequesting: false,
        watchOnlyAddressResponse: null,
        error: action.error.message,
        success: false
      });

    case type.POST_WATCHONLY_WALLET_ADDRESS_REQUEST:
      return state.merge({
        postWatchOnlyWalletAddressRequesting: true,
        error: null,
        generateWatchOnlyAddressResponse: null,
        success: false
      });
    case type.POST_WATCHONLY_WALLET_ADDRESS_SUCCESS:
      return state.merge({
        postWatchOnlyWalletAddressRequesting: false,
        generateWatchOnlyAddressResponse: action.response,
        error: null,
        success: true
      });
    case type.POST_WATCHONLY_WALLET_ADDRESS_FAILURE:
      return state.merge({
        postWatchOnlyWalletAddressRequesting: false,
        generateWatchOnlyAddressResponse: null,
        error: action.error.message,
        success: false
      });
    case type.CLEAR_STATE:
    case LOGOUT_SUCCESS:
      return initialState;
    default:
      return state;
  }
}

export default passwordReducer;
