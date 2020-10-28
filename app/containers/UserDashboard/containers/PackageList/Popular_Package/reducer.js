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
  dataObj: [],
  newData: {},
  packages: [],
  popularPackage: [],
});

function PackageListReducer(state = initialState, action) {
  switch (action.type) {
    case types.POST_CART_REQUEST:
    case types.REMOVE_CART_REQUEST:
    case types.LOAD_ALL_CART_PACKAGE_REQUEST:
    case types.LOAD_ALL_POPULAR_PACKAGE_REQUEST:
      let xresponse =
        state.get('response') != null ? state.get('response') : null;
      return state.merge({
        requesting: true,
        success: false,
        response: xresponse,
        xresponse: null,
        error: null,
      });
    case types.LOAD_ALL_POPULAR_PACKAGE_SUCCESS:
      //   let xresponse =
      //     state.get('response') != null ? state.get('response') : null;
      return state.merge({
        requesting: false,
        success: true,
        response: xresponse,
        error: null,
        popularPackage: fromJS(action.response.data),
      });
    case types.POST_CART_SUCCESS:
      return state.merge({
        requesting: false,
        success: true,
        response: action.response.message,
        error: null,
      });
    case types.REMOVE_CART_SUCCESS:
      return state.merge({
        requesting: false,
        success: true,
        response: action.response.message,
        error: null,
      });
    case types.LOAD_ALL_CART_PACKAGE_SUCCESS:
      return state.merge({
        requesting: false,
        response: action.response.message,
        error: null,
        success: true,
        packages: fromJS(action.response.data),
      });
    case types.POST_CART_FAILURE:
    case types.REMOVE_CART_FAILURE:
    case types.LOAD_ALL_CART_PACKAGE_FAILURE:
    case types.LOAD_ALL_POPULAR_PACKAGE_FAILURE:
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
      });
    default:
      return state;
  }
}

export default PackageListReducer;
