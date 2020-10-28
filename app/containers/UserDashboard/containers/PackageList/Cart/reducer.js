/*
 *
 * PackageList reducer
 *
 */

import { fromJS } from 'immutable';
import * as types from './constants';

const initialState = fromJS({
  response: null,
  xresponse: null,
  error: null,
  requesting: false,
  success: false,
  cart: [],
  subscribedPackage: {},
  cartInfo: [],
  khalti_response: null,
});

function CartReducer(state = initialState, action) {
  switch (action.type) {
    case types.LOAD_CART_DETAIL_REQUEST:
    case types.GET_SUBSCRIBED_PACKAGES_REQUEST:
    case types.CART_CHECKOUT_REQUEST:
    case types.REMOVE_CART_REQUEST:
    case types.LOAD_CART_INFO_REQUEST:
    case types.VERIFY_KHALTI_PAYMENT_REQUEST:
      let xresponse =
        state.get('response') != null ? state.get('response') : null;
      return state.merge({
        requesting: true,
        success: false,
        response: xresponse,
        xresponse: null,
        error: null,
      });
    case types.LOAD_CART_DETAIL_SUCCESS:
      return state.merge({
        requesting: false,
        response: action.response.message,
        error: null,
        success: true,
        cart: fromJS(action.response.data),
      });
    case types.CART_CHECKOUT_SUCCESS:
      return state.merge({
        requesting: false,
        success: true,
        response: action.checkoutResponse.message,
        error: '',
      });
    case types.GET_SUBSCRIBED_PACKAGES_SUCCESS:
      return state.merge({
        requesting: false,
        success: true,
        subscribedPackage: fromJS(action.response.data),
        response: action.response.message,
        error: '',
      });
    case types.LOAD_CART_INFO_SUCCESS:
      return state.merge({
        requesting: false,
        success: true,
        response: action.response.message,
        error: '',
        cartInfo: fromJS(action.response.data),
      });
    case types.REMOVE_CART_SUCCESS:
      return state.merge({
        requesting: false,
        success: true,
        response: action.response.message,
        error: null,
      });
    case types.VERIFY_KHALTI_PAYMENT_SECCESS:
      return state.merge({
        requesting: false,
        success: true,
        khalti_response: action.response.message,
        error: null,
      });
    case types.VERIFY_KHALTI_PAYMENT_FAILURE:
      return state.merge({
        requesting: false,
        success: false,
        response: null,
        error: action.response.data.detail,
      });
    case types.LOAD_CART_DETAIL_FAILURE:
    case types.GET_SUBSCRIBED_PACKAGES_FAILURE:
    case types.CART_CHECKOUT_FAILURE:
    case types.REMOVE_CART_FAILURE:
    case types.LOAD_CART_INFO_FAILURE:
      return state.merge({
        requesting: false,
        success: false,
        response: null,
        error: action.error.message,
      });
    case types.CLEAR_MESSAGE:
      return state.merge({
        response: null,
        error: null,
        khalti_response: null,
      });
    default:
      return state;
  }
}

export default CartReducer;
