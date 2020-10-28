import { take, takeLatest, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import Bitsbeat from 'utils/apiHelper';
import * as types from './constants';
import * as actions from './actions';

function* redirectOnSuccess() {
  yield take(types.LOAD_ANALYTICS_INFO_SUCCESS);
}

function* loadAnalyticsInfoRequest() {
  const token = localStorage.getItem('token');
  const successWatcher = yield fork(redirectOnSuccess);
  yield fork(
    Bitsbeat.get(
      `google-analytics`,
      actions.loadAnalyticsInfoSuccess,
      actions.loadAnalyticsInfoFailure,
      token,
    ),
  );
  yield take([LOCATION_CHANGE, types.LOAD_ANALYTICS_INFO_FAILURE]);
  yield cancel(successWatcher);
}

function* redirectOnAnalyticsInfoUpdateSuccess() {
  yield take(types.UPDATE_ANALYTICS_INFO_SUCCESS);
}

function* updateAnalyticsInfoRequest(action) {
  const token = localStorage.getItem('token');
  const { data } = action;
  const successWatcher = yield fork(redirectOnAnalyticsInfoUpdateSuccess);
  yield fork(
    Bitsbeat.post(
      `google-analytics`,
      actions.updateAnalyticsInfoSuccess,
      actions.updateAnalyticsInfoFailure,
      data,
      token,
      'put',
    ),
  );
  yield take([LOCATION_CHANGE, types.UPDATE_ANALYTICS_INFO_FAILURE]);
  yield cancel(successWatcher);
}

function* redirectOnReportSuccess() {
  yield take(types.LOAD_ANALYTICS_REPORT_SUCCESS);
}

function* loadAnalyticsReportRequest() {
  // const token = localStorage.getItem('token');
  // const successWatcher = yield fork(redirectOnReportSuccess);
  // yield fork(
  //   Bitsbeat.get(
  //     `google-analytics/report`,
  //     actions.loadAnalyticsReportSuccess,
  //     actions.loadAnalyticsReportFailure,
  //     token,
  //   ),
  // );
  // yield take([LOCATION_CHANGE, types.LOAD_ANALYTICS_REPORT_FAILURE]);
  // yield cancel(successWatcher);
}

export default function* analyticsWatcher() {
  yield takeLatest(types.LOAD_ANALYTICS_INFO_REQUEST, loadAnalyticsInfoRequest);
  yield takeLatest(
    types.LOAD_ANALYTICS_REPORT_REQUEST,
    loadAnalyticsReportRequest,
  );
  yield takeLatest(
    types.UPDATE_ANALYTICS_INFO_REQUEST,
    updateAnalyticsInfoRequest,
  );
}
