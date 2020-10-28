/*
 *
 * PackageList actions
 *
 */
import action from 'utils/action';
import * as types from './constants';

export const loadCartDetailRequest = action(types.LOAD_CART_DETAIL_REQUEST);
export const loadCartDetailSuccess = action(
  types.LOAD_CART_DETAIL_SUCCESS,
  'response',
);
export const loadCartDetailFailure = action(
  types.LOAD_CART_DETAIL_FAILURE,
  'error',
);

export const cartCheckoutRequest = action(
  types.CART_CHECKOUT_REQUEST,
  'packages',
);
export const cartCheckoutSuccess = action(
  types.CART_CHECKOUT_SUCCESS,
  'checkoutResponse',
);
export const cartCheckoutFailure = action(
  types.CART_CHECKOUT_FAILURE,
  'checkoutError',
);

export const loadSubscribedPackageRequest = action(
  types.GET_SUBSCRIBED_PACKAGES_REQUEST,
);
export const loadSubscribedPackageSuccess = action(
  types.GET_SUBSCRIBED_PACKAGES_SUCCESS,
  'response',
);
export const loadSubscribedPackageFailure = action(
  types.GET_SUBSCRIBED_PACKAGES_FAILURE,
  'error',
);

export const loadCartInfoRequest = action(types.LOAD_CART_INFO_REQUEST);
export const loadCartInfoSuccess = action(
  types.LOAD_CART_INFO_SUCCESS,
  'response',
);
export const loadCartInfoFailure = action(
  types.LOAD_CART_INFO_FAILURE,
  'error',
);

export const removeCartRequest = action(types.REMOVE_CART_REQUEST, 'cart');
export const removeCartSuccess = action(types.REMOVE_CART_SUCCESS, 'response');
export const removeCartFailure = action(types.REMOVE_CART_FAILURE, 'error');

export const verifyKhaltiPaymentRequest = action(
  types.VERIFY_KHALTI_PAYMENT_REQUEST,
  'data',
);
export const verifyKhaltiPaymentSuccess = action(
  types.VERIFY_KHALTI_PAYMENT_SECCESS,
  'response',
);
export const verifyKhaltiPaymentFailure = action(
  types.VERIFY_KHALTI_PAYMENT_FAILURE,
  'error',
);

export const clearMessage = action(types.CLEAR_MESSAGE);
