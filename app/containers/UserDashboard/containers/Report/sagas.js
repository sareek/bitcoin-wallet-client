import { call, takeLatest } from 'redux-saga/effects';
import * as types from './constants';
import * as actions from './actions';
import API from 'utils/apiHelper';
import getToken from 'utils/getToken';
// import jwtDecode from 'jwt-decode';


function* getReportsListingRequest(action) {
  const token = getToken();
  yield call(
    API.get(
      `report`,
      actions.getReportsListingSuccess,
      actions.getReportsListingFailure,
      token,
    ),
  );
}

function* downloadReportRequest(action) {
  const token = getToken();
  yield call(
    API.post(
      `report/download/${action.product_id}/${action.key}`,
      actions.downloadReportSuccess,
      actions.downloadReportFailure,
      {},
      token,
    ),
  );
}

export default function* reportsWatcher() {
  yield takeLatest(types.GET_REPORT_LISTING_REQUEST, getReportsListingRequest);
  yield takeLatest(types.DOWNLOAD_REPORT_REQUEST, downloadReportRequest);
  // yield takeLatest(types.CHANGE_REFERRAL_REQUEST, updateReferral);
}
