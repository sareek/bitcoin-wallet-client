import { take, takeLatest, fork, call, put, select, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE, push } from "react-router-redux";
import * as types from './constants';
import * as actions from './actions';
import API from 'utils/apiHelper';

function* redirectOnLoadAllSuccess() {
  const action = yield take(types.LOAD_ALL_EXAM_SUCCESS);
  // executed on successful action
  // yield put(push("/next-route"));
}

function* loadAllExamRequestService(action) {
  const token = localStorage.getItem("token");
  const successWatcher = yield fork(redirectOnLoadAllSuccess);
  const {page, perPage, query} = action;
  yield fork(
    API.get(
      `product`,
      actions.loadAllExamSuccess,
      actions.loadAllExamFailure,
      token
    )
  );
  yield take([LOCATION_CHANGE, types.LOAD_ALL_EXAM_FAILURE]);
  yield cancel(successWatcher);
}

function* getProductDetails(action) {
  const token = localStorage.getItem("token");
  const {package_id} = action;
  yield fork(
    API.get(
      `product/detail/${package_id}?`,
      actions.loadPackageExamsSuccess,
      actions.loadPackageExamsFailure,
      token
    )
  );
}

function* redirectOnLoadByIdSuccess() {
  const action = yield take(types.LOAD_EXAM_BY_ID_SUCCESS);
  // executed on successful action
  // yield put(push("/next-route"));
}

function* loadExamByIdService(action) {
  const token = localStorage.getItem("token");
  const successWatcher = yield fork(redirectOnLoadByIdSuccess);
  const {exam_id} = action;
  yield fork(
    API.get(
      `product/detail/${exam_id}`,
      actions.loadExamByIdSuccess,
      actions.loadExamByIdFailure,
      token
    )
  );
  yield take([LOCATION_CHANGE, types.LOAD_EXAM_BY_ID_FAILURE]);
  yield cancel(successWatcher);
}

// Individual exports for testing
export default function* examDisplayWatcher() {
  // See example in containers/HomePage/sagas.js
  yield takeLatest(types.LOAD_ALL_EXAM_REQUEST, loadAllExamRequestService);
  yield takeLatest(types.LOAD_EXAM_BY_ID_REQUEST, loadExamByIdService);
  yield takeLatest(types.LOAD_PACKAGE_EXAMS_REQUEST, getProductDetails);
}
