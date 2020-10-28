import { take, takeLatest, fork, call, put, select, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE, push } from "react-router-redux";
import * as types from './constants';
import * as actions from './actions';
import API from 'utils/apiHelper';

function* redirectOnSuccess() {
  const action = yield take(types.USER_CONFIRAMATION_SUCCESS);
  // executed on successful action
  // yield put(push("/next-route"));
}

function* loadUserConfirmationRequest(action) {
  const successWatcher = yield fork(redirectOnSuccess);
  const {id} = action
  yield fork(
    API.get(
      `confirm/user/${id}`,
      actions.loadUserConfirmationSuccess,
      actions.loadUserConfirmationFailure,
    )
  );
  yield take([LOCATION_CHANGE, types.USER_CONFIRAMATION_FAILURE]);
  yield cancel(successWatcher);
}

export default function* userConfirmationWatcher(){
  yield takeLatest(types.USER_CONFIRAMATION_REQUEST, loadUserConfirmationRequest);
}