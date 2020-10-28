import { call, takeLatest } from 'redux-saga/effects';
import * as types from './constants';
import * as actions from './actions';
import API from 'utils/apiHelper';
import getToken from 'utils/getToken';
// import jwtDecode from 'jwt-decode';

function* getGraphDataRequest(action) {
  const token = getToken();
  yield call(
    API.get(
      `graph/${action.product_id}`,
      actions.getGraphDataSuccess,
      actions.getGraphDataSuccess,
      token,
    ),
  );
}

function* downloadReportRequest(action) {
  const token = getToken();
  yield call(
    API.post(
      `report/download/${action.product_id}`,
      actions.downloadReportSuccess,
      actions.downloadReportFailure,
      {},
      token,
    ),
  );
}

export default function* reportDetailWatcher() {
  yield takeLatest(types.GET_GRAPH_REQUEST, getGraphDataRequest);
  yield takeLatest(types.DOWNLOAD_REPORT_REQUEST, downloadReportRequest);
}
