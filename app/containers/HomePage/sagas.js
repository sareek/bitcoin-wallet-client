import React from 'react';
import { LOCATION_CHANGE } from 'react-router-redux';
import { takeLatest, take, fork, cancel, call } from 'redux-saga/effects';
import API from 'utils/apiHelper';
import getToken from 'utils/getToken';
import * as types from './constants';
import * as actions from './actions';

function* redirectOnSignupSuccess() {
    const action = yield take(types.USER_SIGNUP_SUCCESS);
  }

function* signupFlow(action) {
    const successWatcher = yield fork(redirectOnSignupSuccess);
    yield fork(
    API.post(
        'signup/',
        actions.userSignUpSuccess,
        actions.userSignUpFailure,
        action.data,
      ),
    );
    yield take([LOCATION_CHANGE, types.USER_SIGNUP_FAILURE]);
    yield cancel(successWatcher);
  }


export default function* homepageSaga() {
    yield takeLatest(types.SIGNUP_REQUEST, signupFlow);
}
