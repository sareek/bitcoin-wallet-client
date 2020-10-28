/*
 *
 * PackageList actions
 *
 */
import action from 'utils/action';
import * as types from './constants';


// export const getProductRequest = action(
//   types.GET_PACKGE_REQUEST,
//   'page',
//   'perPage',
//   'query',
// );
// export const getProductSuccess = action(
//   types.GET_PACKGE_SUCCESS,
//   'response',
// );
// export const getProductFailure = action(types.GET_PACKGE_FAILURE, 'error');


export const loadAllPackageRequest = action(
  types.LOAD_PACKGE_REQUEST,
  'page',
  'perPage',
  'query',
);
export const loadAllPackageSuccess = action(
  types.LOAD_PACKGE_SUCCESS,
  'response',
);
export const loadAllPackageFailure = action(types.LOAD_PACKGE_FAILURE, 'error');

export const loadPackageByIdRequest = action(
  types.LOAD_PACKGE_BY_ID_REQUEST,
  'id',
);
export const loadPackageByIdSuccess = action(
  types.LOAD_PACKGE_BY_ID_SUCCESS,
  'response',
);
export const loadPackageByIdFailure = action(
  types.LOAD_PACKGE_BY_ID_FAILURE,
  'error',
);

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

export const clearMessage = action(types.CLEAR_MESSAGE);
