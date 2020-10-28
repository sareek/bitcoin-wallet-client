import React from 'react';
import { LOCATION_CHANGE, push } from 'react-router-redux';
import { takeLatest, take, put, fork, cancel } from 'redux-saga/effects';
import * as types from './constants';
import * as actions from './actions';
import { setToken, setUser } from 'containers/App/actions';
import { loginSuccess } from '../actions';
import API from 'utils/apiHelper';

function* redirectOnMultiFactorAuthLoginSuccess() {
  const action = yield take(types.MULTI_FACTOR_AUTH_LOGIN_SUCCESS);
  const { response } = action;
  const { token, userInfo } = response.data;
    localStorage.setItem('token', token);
    yield put(setToken(token));
    yield put(setUser(userInfo));
    if (userInfo.role === 'customer') {
      yield put(push('/user/dashboard'));
    } else {
      yield put(push('/admin/dashboard'));
    }
}

function* multiFactorAuthLoginFlow(action) {
  const successWatcher = yield fork(redirectOnMultiFactorAuthLoginSuccess);
  const dispatchData = {
    email: action.userEmail,
    otp: action.data.totp_token
  }
  yield fork(
    API.post(
      `multifactor_login/`,
      actions.multiFactorAuthLoginSuccess,
      actions.multiFactorAuthLoginFailure,
      dispatchData,
      action.token
    ),
  );
  yield take([LOCATION_CHANGE, types.MULTI_FACTOR_AUTH_LOGIN_FAILURE]);
  yield cancel(successWatcher);
}

export default function* multiFactorAuthSaga() {
  yield takeLatest(
    types.MULTI_FACTOR_AUTH_LOGIN_REQUEST,
    multiFactorAuthLoginFlow,
  );
}
