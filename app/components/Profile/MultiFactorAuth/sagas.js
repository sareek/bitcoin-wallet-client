import { takeLatest, take, put, call, select, fork, cancel } from "redux-saga/effects";
import { LOCATION_CHANGE } from "react-router-redux";
import * as types from "./constants";
import {
  verifyMultiFactorAuthSuccess, verifyMultiFactorAuthFailure,
  getMultiFactorAuthSuccess, getMultiFactorAuthFailure,
  disableMultiFactorAuthSuccess, disableMultiFactorAuthFailure,
  getRecoveryCodesSuccess, getRecoveryCodesFailure,
  sendMultiFactorRecoveryCodesEmailSuccess, sendMultiFactorRecoveryCodesEmailFailure,
  generateRecoveryCodeSuccess, generateRecoveryCodeFailure,
  loadBasicInfoSuccess, loadBasicInfoFailure, enable2faAuthSuccess, enable2faAuthFailure
} from "./actions";
import { updateUserInfo } from 'containers/Login/actions'
import API from 'utils/apiHelper';
import { makeSelectUser } from 'containers/App/selectors';
import getToken from 'utils/getToken';

function* redirectOnVerifyMultiFactorAuthSuccess() {
  yield take(types.VERIFY_MULTI_FACTOR_AUTH_SUCCESS);
  const userInfo = yield select(makeSelectUser());
  let newUserInfo = userInfo.toJS();
  newUserInfo = {...newUserInfo, multi_factor_auth_enable: true };
  yield put(updateUserInfo(newUserInfo));
}

function* redirectOnGetMultiFactorAuthSuccess() {}

function* redirectOnDisableMultiFactorAuthSuccess() {
  yield take(types.DISABLE_MULTI_FACTOR_AUTH_SUCCESS);
  const userInfo = yield select(makeSelectUser());
  let newUserInfo = userInfo.toJS();
  newUserInfo = {...newUserInfo, multi_factor_auth_enable: false };
  yield put(updateUserInfo(newUserInfo));
}

// function* verifyMultiFactorAuthFlow(action) {
//   const token = getToken();
//   const successWatcher = yield fork(redirectOnVerifyMultiFactorAuthSuccess);

//   yield fork(API.post(`multi-factor-auth/totp-verify?secret=${action.secret}`, verifyMultiFactorAuthSuccess,
//     verifyMultiFactorAuthFailure, action.payload, token));
//   yield take([LOCATION_CHANGE, types.VERIFY_MULTI_FACTOR_AUTH_FAILURE]);
//   yield cancel(successWatcher);
// }

function* verifyMultiFactorAuthFlow(action) {
  const token = getToken();
  const { payload: {totp_token }, email  } = action; 
  const successWatcher = yield fork(redirectOnVerifyMultiFactorAuthSuccess);

  yield fork(API.post(`verify_otp/`, verifyMultiFactorAuthSuccess,
    verifyMultiFactorAuthFailure, {email: email, otp: totp_token}, token));
  yield take([LOCATION_CHANGE, types.VERIFY_MULTI_FACTOR_AUTH_FAILURE]);
  yield cancel(successWatcher);
}

function* getMultiFactorAuthFlow() {
  const token = getToken();
  const successWatcher = yield fork(redirectOnGetMultiFactorAuthSuccess);

  yield fork(API.get(`multi-factor-auth/totp-setup`, getMultiFactorAuthSuccess, getMultiFactorAuthFailure,
    token));
  yield take([LOCATION_CHANGE, types.GET_MULTI_FACTOR_AUTH_FAILURE]);
  yield cancel(successWatcher);
}

function* disableMultiFactorAuthFlow(action) {
  const token = getToken();
  const { userEmail, totp_token } = action.payload;
  const successWatcher = yield fork(redirectOnDisableMultiFactorAuthSuccess);
  yield fork(API.post(`disable_2fa/`, disableMultiFactorAuthSuccess,
      disableMultiFactorAuthFailure, {email: userEmail, otp: totp_token }, token));
  yield take([LOCATION_CHANGE, types.DISABLE_MULTI_FACTOR_AUTH_FAILURE]);
  yield cancel(successWatcher);
}

function* getRecoveryCodesFlow() {
  const token = getToken();
  yield fork(API.get("multi-factor-auth/recovery-code/get", getRecoveryCodesSuccess, getRecoveryCodesFailure,
    token));
}

function* sendEmailRecoveryCodesFlow(payload) {
  const token = getToken();
  yield call(API.get(`multi-factor-auth/recovery-code/send/${payload.userId}`,
    sendMultiFactorRecoveryCodesEmailSuccess, sendMultiFactorRecoveryCodesEmailFailure, token));
}

function* generateRecoveryCodesFlow(payload) {
  const token = getToken();
  yield call(API.put(`multi-factor-auth/generate/recovery-code/${payload.userId}`, generateRecoveryCodeSuccess,
    generateRecoveryCodeFailure, {_id: payload.userId}, token));
}

function* loadBasicInfoFlow(payload) {
  const token = getToken();
  const { userEmail } = payload;
  yield call(API.post(`get_general_info/`, loadBasicInfoSuccess, loadBasicInfoFailure, {email: userEmail}, token));
}

function* enable2FAAuthFlow(action) {
  const token = getToken();
  yield fork(API.post(`enable_2fa/`, enable2faAuthSuccess, enable2faAuthFailure, action.payload,
    token));
  yield take([LOCATION_CHANGE, types.ENABLE_2FA_AUTH_FAILURE]);
}

export default function* addMultiFactorAuthWatcher() {
  yield takeLatest(types.GET_MULTI_FACTOR_AUTH_REQUEST, getMultiFactorAuthFlow);
  yield takeLatest(types.ENABLE_2FA_AUTH_REQUEST, enable2FAAuthFlow);
  yield takeLatest(types.VERIFY_MULTI_FACTOR_AUTH_REQUEST, verifyMultiFactorAuthFlow);
  yield takeLatest(types.DISABLE_MULTI_FACTOR_AUTH_REQUEST, disableMultiFactorAuthFlow);
  yield takeLatest(types.GET_RECOVERY_CODES_REQUEST, getRecoveryCodesFlow);
  yield takeLatest(types.SEND_EMAIL_WITH_MFA_RECOVERY_REQUEST, sendEmailRecoveryCodesFlow);
  yield takeLatest(types.GENERATE_RECOVERY_CODE_REQUEST, generateRecoveryCodesFlow);
  yield takeLatest(types.LOAD_BASIC_INFO_REQUEST, loadBasicInfoFlow);
}