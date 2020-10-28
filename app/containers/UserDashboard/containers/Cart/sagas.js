import { call, takeLatest, fork, put, take, cancel } from 'redux-saga/effects';
import * as types from './constants';
import * as actions from './actions';
import API from 'utils/apiHelper';
import getToken from 'utils/getToken';
import { LOCATION_CHANGE, push } from 'react-router-redux';
// import jwtDecode from 'jwt-decode';


function* getProductsInCartRequest(action) {
  const token = getToken();
  yield call(
    API.get(
      `cart`,
      actions.getProductsInCartSuccess,
      actions.getProductsInCartFailure,
      token,
    ),
  );
}

function* redirectOnSuccess() {
  const action = yield take(types.REMOVE_CART_SUCCESS);
  // yield put(push('/user/dashboard/cart'));

}

function* removeCartRequest(action) {
  const token = localStorage.getItem('token');
  const { product_id } = action;
  const successWatcher = yield fork(redirectOnSuccess);
  yield fork(
    API.patch(
      `cart/info/${product_id}`,
      actions.removeCartSuccess,
      actions.removeCartFailure,
      {},
      token,
    ),
  );
  yield take([LOCATION_CHANGE, types.REMOVE_CART_FAILURE]);
  yield cancel(successWatcher);
}

function* placeOrderRequest(action) {
  const token = getToken();
  const { product_ids } = action;
  yield call(
    API.post(
      `order`,
      actions.placeOrderSuccess,
      actions.placeOrderFailure,
      {product_id: product_ids},
      token,
    ),
  );
}

function* payThroughCardRequest(action) {
  const token = getToken();
  const { nonce } = action;
  yield call(
    API.post(
      `payment`,
      actions.payThroughCardSuccess,
      actions.payThroughCardFailure,
      {nonce: nonce},
      token,
    ),
  );
}

export default function* reportsWatcher() {
  yield takeLatest(types.GET_PRODUCTS_IN_CART_REQUEST, getProductsInCartRequest);
  yield takeLatest(types.PLACE_ORDER_REQUEST, placeOrderRequest);
  yield takeLatest(types.REMOVE_CART_REQUEST, removeCartRequest);
  yield takeLatest(types.PAY_THROUGH_CARD_REQUEST, payThroughCardRequest);
}
