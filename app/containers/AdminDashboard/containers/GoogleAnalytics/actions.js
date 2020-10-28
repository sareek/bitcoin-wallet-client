import action from 'utils/action';
import * as types from './constants';

export const loadAnalyticsInfoRequest = action(
  types.LOAD_ANALYTICS_INFO_REQUEST,
);
export const loadAnalyticsInfoSuccess = action(
  types.LOAD_ANALYTICS_INFO_SUCCESS,
  'response',
);
export const loadAnalyticsInfoFailure = action(
  types.LOAD_ANALYTICS_INFO_FAILURE,
  'error',
);

export const loadAnalyticsReportRequest = action(
  types.LOAD_ANALYTICS_REPORT_REQUEST,
);
export const loadAnalyticsReportSuccess = action(
  types.LOAD_ANALYTICS_REPORT_SUCCESS,
  'response',
);
export const loadAnalyticsReportFailure = action(
  types.LOAD_ANALYTICS_REPORT_FAILURE,
  'error',
);

export const updateAnalyticsInfoRequest = action(
  types.UPDATE_ANALYTICS_INFO_REQUEST,
  'data',
);
export const updateAnalyticsInfoSuccess = action(
  types.UPDATE_ANALYTICS_INFO_SUCCESS,
  'response',
);
export const updateAnalyticsInfoFailure = action(
  types.UPDATE_ANALYTICS_INFO_FAILURE,
  'error',
);

export const clearMessage = action(types.CLEAR_MESSAGE);
