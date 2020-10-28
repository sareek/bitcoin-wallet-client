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
import TenderKo from 'utils/apiHelper';
import { makeSelectToken } from 'containers/App/selectors';

function* loadAllPopularPackages(action) {
  const token = localStorage.getItem('token');
  yield fork(
    TenderKo.get(
      `mcqs-package/popular-package`,
      actions.loadAllPopularPackageSuccess,
      actions.loadAllPopularPackageFailure,
      token,
    ),
  );
}

function* loadAllCartPackageRequest() {
  const token = localStorage.getItem('token');
  yield fork(
    TenderKo.get(
      'cart',
      actions.loadAllCartPackageSuccess,
      actions.loadAllCartPackageFailure,
      token,
    ),
  );
}

function* redirectOnPostCartSuccess() {
  const action = yield take(types.POST_CART_SUCCESS);
  yield put(push(`/user/dashboard`));
}
function* postCartRequest(action) {
  const token = localStorage.getItem('token');
  const { cart } = action;
  const successWatcher = yield fork(redirectOnPostCartSuccess);

  yield fork(
    TenderKo.post(
      `cart`,
      actions.postCartSuccess,
      actions.postCartFailure,
      cart,
      token,
    ),
  );
  yield take([LOCATION_CHANGE, types.POST_CART_FAILURE]);
  yield cancel(successWatcher);
}

function* redirectOnDeleteCartSuccess() {
  const action = yield take(types.REMOVE_CART_SUCCESS);
  yield put(push(`/user/dashboard`));
}
function* removeCartRequest(action) {
  const token = localStorage.getItem('token');
  const { cart } = action;
  const successWatcher = yield fork(redirectOnDeleteCartSuccess);
  yield fork(
    TenderKo.patch(
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

export default function* packageWatcher() {
  yield takeLatest(types.POST_CART_REQUEST, postCartRequest);
  yield takeLatest(
    types.LOAD_ALL_CART_PACKAGE_REQUEST,
    loadAllCartPackageRequest,
  );
  yield takeLatest(types.REMOVE_CART_REQUEST, removeCartRequest);
  yield takeLatest(
    types.LOAD_ALL_POPULAR_PACKAGE_REQUEST,
    loadAllPopularPackages,
  );
}
