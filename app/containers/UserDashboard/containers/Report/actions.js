import action from 'utils/action';
import * as types from './constants';

export const getReportsListingRequest = action(
  types.GET_REPORT_LISTING_REQUEST,
);
export const getReportsListingSuccess = action(
  types.GET_REPORT_LISTING_SUCCESS,
  'response',
);
export const getReportsListingFailure = action(
  types.GET_REPORT_LISTING_FAILURE,
  'error',
);

export const downloadReportRequest = action(
  types.DOWNLOAD_REPORT_REQUEST,
  'key',
  'product_id'
);
export const downloadReportSuccess = action(
  types.DOWNLOAD_REPORT_SUCCESS,
  'response',
);
export const downloadReportFailure = action(
  types.DOWNLOAD_REPORT_FAILURE,
  'error',
);

export const clearMessage = action(types.CLEAR_MESSAGE);
