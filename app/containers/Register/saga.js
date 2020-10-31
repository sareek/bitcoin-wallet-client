import React from 'react';
import { LOCATION_CHANGE, push } from 'react-router-redux';
import {
  select,
  takeLatest,
  take,
  put,
  fork,
  cancel,
  call,
  delay,
} from 'redux-saga/effects';
import ModalWrapper from 'components/common/ModalWrapper';
import * as types from './constants';
import { showDialog } from 'containers/App/actions';
import { setEmail, loginSuccess } from 'containers/Login/actions';
import Api from 'utils/apiHelper';
import { makeSelectLocation } from '../App/selectors';
import * as actions from './actions';
import Login from '../Login/LoginForm';
import PasswordSetForm from './PasswordSetForm';

function* redirectOnSignupSuccess() {
  const action = yield take(types.SIGNUP_SUCCESS);
}

function* signupFailureFlow() {
  try {
    window.grecaptcha.reset();
  } catch (err) {
    // show error
  }
}

function* signupFlow(action) {
  const successWatcher = yield fork(redirectOnSignupSuccess);
  yield fork(
    Api.post(
      'signup/',
      actions.signupSuccess,
      actions.signupFailure,
      action.data,
    ),
  );
  yield take([LOCATION_CHANGE, types.SIGNUP_FAILURE]);
  yield cancel(successWatcher);
}

function* redirectOnSignupWithFbSuccess(isImp) {
  const action = yield take(types.LINK_FACEBOOK_SUCCESS);
  // show dialog for password and accept terms
  if (action.response.data.token) {
    // it is sign in case as the fb use is already a user
    yield put(loginSuccess(action.response));
    yield put(showDialog(null));
  } else {
    yield put(
      showDialog(
        <PasswordSetForm
          user_id={action.response.data._id}
          email={action.response.data.email}
          isImp={isImp}
        />,
      ),
    );
  }
}

function* signupWithFbFlow(action) {
  const successWatcher = yield fork(
    redirectOnSignupWithFbSuccess,
    !!action.isImp,
  );
  yield fork(
    Api.post(
      `api/social-account/auth/facebook/${action.payload}`,
      actions.linkFacebookSuccess,
      actions.linkFacebookFailure,
      {},
    ),
  );
  yield take([LOCATION_CHANGE, types.LINK_FACEBOOK_FAILURE]);
  yield cancel(successWatcher);
}

function* redirectOnSignupWithGoogleSuccess(isImp) {
  const action = yield take(types.LINK_GOOGLE_SUCCESS);
  // show dialog for password and accept terms
  if (action.response.data.token) {
    // it is sign in case as the fb use is already a user
    yield put(loginSuccess(action.response));
    yield put(showDialog(null));
  } else {
    yield put(
      showDialog(
        <PasswordSetForm
          user_id={action.response.data._id}
          email={action.response.data.email}
          isImp={isImp}
        />,
      ),
    );
  }
}

function* signupWithGoogleFlow(action) {
  const successWatcher = yield fork(
    redirectOnSignupWithGoogleSuccess,
    !!action.isImp,
  );
  yield fork(
    Api.post(
      `api/social-account/auth/google/${action.payload}`,
      actions.linkGoogleSuccess,
      actions.linkGoogleFailure,
      {},
    ),
  );
  yield take([LOCATION_CHANGE, types.LINK_GOOGLE_FAILURE]);
  yield cancel(successWatcher);
}

function* referCodeVerification(action) {
  const successWatcher = yield fork(redirectOnreferCodeVerificationSuccess);
  yield fork(
    Api.get(
      `imp/new/referral/${action.refer_code}`,
      actions.verifyReferCodeSuccess,
      actions.verifyReferCodeFailure,
    ),
  );
  yield take([LOCATION_CHANGE, types.VERIFY_REFER_CODE_FAILURE]);
  yield cancel(successWatcher);
}

function* redirectOnreferCodeVerificationSuccess() {
  const action = yield take(types.VERIFY_REFER_CODE_SUCCESS);
}

function* referCodeVerify(action) {
  const successWatcher = yield fork(redirectOnreferCodeVerifySuccess);
  yield fork(
    Api.get(
      `imp/new/referral/${action.refer}`,
      actions.verifyReferCodeSuc,
      actions.verifyReferCodeFai,
    ),
  );
  yield take([LOCATION_CHANGE, types.VERIFY_REFER_CODE_FAI]);
  yield cancel(successWatcher);
}

function* redirectOnreferCodeVerifySuccess() {
  const action = yield take(types.VERIFY_REFER_CODE_SUC);
}

export default function* signupSaga() {
  yield takeLatest(types.SIGNUP_REQUEST, signupFlow);
  yield takeLatest(types.SIGNUP_FAILURE, signupFailureFlow);
  yield takeLatest(types.LINK_FACEBOOK_REQUEST, signupWithFbFlow);
  yield takeLatest(types.LINK_GOOGLE_REQUEST, signupWithGoogleFlow);
  yield takeLatest(types.VERIFY_REFER_CODE_REQUEST, referCodeVerification);
  yield takeLatest(types.VERIFY_REFER_CODE_REQ, referCodeVerify);
}
