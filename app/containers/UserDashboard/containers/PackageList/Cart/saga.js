import {
  take,
  takeLatest,
  call,
  put,
  select,
  fork,
  cancel,
} from 'redux-saga/effects';
import { LOCATION_CHANGE, push } from 'react-router-redux';
import * as types from './constants';
import * as actions from './actions';
import Api from 'utils/apiHelper';
import { makeSelectToken } from 'containers/App/selectors';

function* loadCartDetail() {
  const token = localStorage.getItem('token');
  yield fork(
    Api.get(
      'cart/detail',
      actions.loadCartDetailSuccess,
      actions.loadCartDetailFailure,
      token,
    ),
  );
}

function* loadCartInfo() {
  const token = localStorage.getItem('token');
  yield fork(
    Api.get(
      'cart',
      actions.loadCartInfoSuccess,
      actions.loadCartInfoFailure,
      token,
    ),
  );
}

function* loadSubscribedPackage() {
  const token = localStorage.getItem('token');
  yield fork(
    Api.get(
      'package-subscription/detail',
      actions.loadSubscribedPackageSuccess,
      actions.loadSubscribedPackageFailure,
      token,
    ),
  );
}

function* redirectOnCartSubscribeSuccess() {
  const action = yield take(types.CART_CHECKOUT_SUCCESS);
  // yield put(push(`/user/dashboard`));
}
function* postCartSubscribeRequest(action) {
  const token = localStorage.getItem('token');
  const { packages } = action;
  const successWatcher = yield fork(redirectOnCartSubscribeSuccess);

  yield fork(
    Api.post(
      `package-subscription`,
      actions.cartCheckoutSuccess,
      actions.cartCheckoutFailure,
      packages,
      token,
    ),
  );
  yield take([LOCATION_CHANGE, types.CART_CHECKOUT_FAILURE]);
  yield cancel(successWatcher);
}
function* redirectOnDeleteCartSuccess() {
  const action = yield take(types.REMOVE_CART_SUCCESS);
  // yield put(push(`/user/dashboard`));
}
function* removeCartRequest(action) {
  const token = localStorage.getItem('token');
  const { cart } = action;
  const successWatcher = yield fork(redirectOnDeleteCartSuccess);
  yield fork(
    Api.patch(
      `cart`,
      actions.removeCartSuccess,
      actions.removeCartFailure,
      cart,
      token,
    ),
  );
  yield take([LOCATION_CHANGE, types.REMOVE_CART_FAILURE]);
  yield cancel(successWatcher);
}

function* redirectOnKhaltiVerificationSuccess() {
  const action = yield take(types.VERIFY_KHALTI_PAYMENT_SECCESS);
  // yield put(push(`/user/dashboard/my-cart`));
}
function* khaltiVerificationRequest(action) {
  const { data } = action;
  const token = localStorage.getItem('token');
  const successWatcher = yield fork(redirectOnKhaltiVerificationSuccess);

  yield fork(
    Api.post(
      `cart/khalti-payment`,
      actions.verifyKhaltiPaymentSuccess,
      actions.verifyKhaltiPaymentFailure,
      data,
      token,
    ),
  );
  yield take([LOCATION_CHANGE, types.VERIFY_KHALTI_PAYMENT_FAILURE]);
  yield cancel(successWatcher);
}

export default function* cartWatcher() {
  yield takeLatest(types.LOAD_CART_DETAIL_REQUEST, loadCartDetail);
  yield takeLatest(types.CART_CHECKOUT_REQUEST, postCartSubscribeRequest);
  yield takeLatest(
    types.GET_SUBSCRIBED_PACKAGES_REQUEST,
    loadSubscribedPackage,
  );
  yield takeLatest(types.REMOVE_CART_REQUEST, removeCartRequest);
  yield takeLatest(types.LOAD_CART_INFO_REQUEST, loadCartInfo);
  yield takeLatest(
    types.VERIFY_KHALTI_PAYMENT_REQUEST,
    khaltiVerificationRequest,
  );
}
