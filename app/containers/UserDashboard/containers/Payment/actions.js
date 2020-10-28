import action from 'utils/action';
import * as types from './constants';

export const updateOrderRequest = action(
  types.UPDATE_ORDER_REQUEST,
  'payload'
);
export const updateOrderSuccess = action(
  types.UPDATE_ORDER_SUCCESS,
  'response',
);
export const updateOrderFailure = action(
  types.UPDATE_ORDER_FAILURE,
  'error',
);


export const clearCartRequest = action(
  types.CLEAR_CART_REQUEST,
  'payload'
);
export const clearCartSuccess = action(
  types.CLEAR_CART_SUCCESS,
  'response',
);
export const clearCartFailure = action(
  types.CLEAR_CART_FAILURE,
  'error',
);

// updateOrderRequest


// export const clearMessage = action(types.CLEAR_MESSAGE);
