import { call, takeLatest, fork, put, take, cancel } from 'redux-saga/effects';
import * as types from './constants';
import * as actions from './actions';
import API from 'utils/apiHelper';
import getToken from 'utils/getToken';
import { LOCATION_CHANGE, push } from 'react-router-redux';
// import jwtDecode from 'jwt-decode';

function* updateOrderRequest(action) {
  const token = getToken();
  const { payload } = action;
  yield call(
    API.put(
      `order/update/${payload.order_id}/${payload.payment_id}`,
      actions.updateOrderSuccess,
      actions.updateOrderFailure,
      payload,
      token,
    ),
  );
}

function* clearCartRequest(action) {
  const token = getToken();
  const { payload } = action;
  yield call(
    API.patch(
      `cart/remove/${payload.payment_id}`,
      actions.clearCartSuccess,
      actions.clearCartFailure,
      {},
      token,
    ),
  );
}

export default function* reportsWatcher() {
  yield takeLatest(types.UPDATE_ORDER_REQUEST, updateOrderRequest);
  yield takeLatest(types.CLEAR_CART_REQUEST, clearCartRequest);
}
