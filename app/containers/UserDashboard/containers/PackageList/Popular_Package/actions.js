/*
 *
 * PackageList actions
 *
 */
import action from 'utils/action';
import * as types from './constants';

export const postCartRequest = action(types.POST_CART_REQUEST, 'cart');
export const postCartSuccess = action(types.POST_CART_SUCCESS, 'response');
export const postCartFailure = action(types.POST_CART_FAILURE, 'error');

export const removeCartRequest = action(types.REMOVE_CART_REQUEST, 'cart');
export const removeCartSuccess = action(types.REMOVE_CART_SUCCESS, 'response');
export const removeCartFailure = action(types.REMOVE_CART_FAILURE, 'error');

export const loadAllCartPackageRequest = action(
  types.LOAD_ALL_CART_PACKAGE_REQUEST,
);
export const loadAllCartPackageSuccess = action(
  types.LOAD_ALL_CART_PACKAGE_SUCCESS,
  'response',
);
export const loadAllCartPackageFailure = action(
  types.LOAD_ALL_CART_PACKAGE_FAILURE,
  'error',
);

export const loadAllPopularPackageRequest = action(
  types.LOAD_ALL_POPULAR_PACKAGE_REQUEST,
);
export const loadAllPopularPackageSuccess = action(
  types.LOAD_ALL_POPULAR_PACKAGE_SUCCESS,
  'response',
);
export const loadAllPopularPackageFailure = action(
  types.LOAD_ALL_POPULAR_PACKAGE_FAILURE,
  'error',
);

export const clearMessage = action(types.CLEAR_MESSAGE);
