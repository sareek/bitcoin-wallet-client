import action from 'utils/action';
import * as types from './constants';


export const payThroughCardRequest = action(
  types.PAY_THROUGH_CARD_REQUEST,
  'nonce'
);
export const payThroughCardSuccess = action(
  types.PAY_THROUGH_CARD_SUCCESS,
  'response',
);
export const payThroughCardFailure = action(
  types.PAY_THROUGH_CARD_FAILURE,
  'error',
);




export const getProductsInCartRequest = action(
  types.GET_PRODUCTS_IN_CART_REQUEST,
);
export const getProductsInCartSuccess = action(
  types.GET_PRODUCTS_IN_CART_SUCCESS,
  'response',
);
export const getProductsInCartFailure = action(
  types.GET_PRODUCTS_IN_CART_FAILURE,
  'error',
);


export const removeCartRequest = action(
  types.REMOVE_CART_REQUEST,
  'product_id'
);
export const removeCartSuccess = action(
  types.REMOVE_CART_SUCCESS,
  'response',
);
export const removeCartFailure = action(
  types.REMOVE_CART_FAILURE,
  'error',
);

export const placeOrderRequest = action(
  types.PLACE_ORDER_REQUEST,
  'product_ids'
);
export const placeOrderSuccess = action(
  types.PLACE_ORDER_SUCCESS,
  'response',
);
export const placeOrderFailure = action(
  types.PLACE_ORDER_FAILURE,
  'error',
);




export const clearMessage = action(types.CLEAR_MESSAGE);
