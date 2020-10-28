import { takeLatest, take, select, put, fork, cancel, call } from "redux-saga/effects";
import { LOCATION_CHANGE, push } from "react-router-redux";
import * as types from "./constants";
import {
  getEmergencyContactInfoSuccess,
  getEmergencyContactInfoFailure,
  addEmergencyContactInfoSuccess,
  addEmergencyContactInfoFailure,
  updateEmergencyContactInfoSuccess,
  updateEmergencyContactInfoFailure,
  removeEmergencyContactInfoSuccess,
  removeEmergencyContactInfoFailure
} from "./actions";

import API from "utils/apiHelper";

import getToken from 'utils/getToken';

function* redirectOnSuccess() {
}

function* getEmergencyContactInfoFlow(action) {
  const token = getToken();

  const successWatcher = yield fork(redirectOnSuccess);
  yield fork(
    API.get(
      `api/emergency-contact-info/data/${action.userId}`,
      getEmergencyContactInfoSuccess,
      getEmergencyContactInfoFailure,
      token
    )
  );
  yield take([LOCATION_CHANGE, types.GET_EMERGENCY_CONTACT_INFO_FAILURE]);
  yield cancel(successWatcher);
}

function* addEmergencyContactInfoFlow(action) {
  const token = getToken();

  const successWatcher = yield fork(redirectOnSuccess);
  yield fork(
    API.post(
      `api/emergency-contact-info/data/${action.userId}`,
      addEmergencyContactInfoSuccess,
      addEmergencyContactInfoFailure,
      action.data,
      token
    )
  );
  yield take([LOCATION_CHANGE, types.ADD_EMERGENCY_CONTACT_INFO_FAILURE]);
  yield cancel(successWatcher);
}

function* updateEmergencyContactInfoFlow(action) {
  const token = getToken();

  const successWatcher = yield fork(redirectOnSuccess);
  yield fork(
    API.put(
      `api/emergency-contact-info/data/${action.userId}/${action.id}`,
      updateEmergencyContactInfoSuccess,
      updateEmergencyContactInfoFailure,
      action.data,
      token
    )
  );
  yield take([LOCATION_CHANGE, types.UPDATE_EMERGENCY_CONTACT_INFO_FAILURE]);
  yield cancel(successWatcher);

  // yield call(delay, 5000);
  // yield put(passwordClearErrors());
}

function* removeEmergencyContactInfoFlow(action) {
  const token = getToken();

  const successWatcher = yield fork(redirectOnSuccess);
  yield fork(
    API.patch(
      `api/emergency-contact-info/data/${action.userId}/${action.id}`,
      removeEmergencyContactInfoSuccess,
      removeEmergencyContactInfoFailure,
      {_id: action.id},
      token
    )
  );
  yield take([LOCATION_CHANGE, types.REMOVE_EMERGENCY_CONTACT_INFO_FAILURE]);
  yield cancel(successWatcher);
}

export default function* emergencyContactInfoUpdateWatcher() {
  yield takeLatest(types.GET_EMERGENCY_CONTACT_INFO_REQUEST, getEmergencyContactInfoFlow);
  yield takeLatest(types.ADD_EMERGENCY_CONTACT_INFO_REQUEST, addEmergencyContactInfoFlow);
  yield takeLatest(types.UPDATE_EMERGENCY_CONTACT_INFO_REQUEST, updateEmergencyContactInfoFlow);
  yield takeLatest(types.REMOVE_EMERGENCY_CONTACT_INFO_REQUEST, removeEmergencyContactInfoFlow);
}