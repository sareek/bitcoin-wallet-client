import action from 'utils/action';
import * as types from './constants';

export const getGraphDataRequest = action(
  types. GET_GRAPH_REQUEST,
  'product_id',
);
export const getGraphDataSuccess = action(
  types. GET_GRAPH_SUCCESS,
  'response',
);
export const getGraphDataFailure = action(
  types. GET_GRAPH_FAILURE,
  'error',
);

export const downloadReportRequest = action(
  types. DOWNLOAD_REPORT_REQUEST,
  'product_id',
);
export const downloadReportSuccess = action(
  types.DOWNLOAD_REPORT_SUCCESS,
  'response',
);
export const downloadReportFailure = action(
  types. DOWNLOAD_REPORT_FAILURE,
  'error',
);




export const clearMessage = action(types.CLEAR_MESSAGE);

// export const updateProfile = action(types.UPDATE_PROFILE, 'agentId', 'profile');
// export const profileUpdated = action(types.UPDATE_PROFILE_SUCCESS, 'response');
// export const profileUpdatingFailure = action(types.UPDATE_PROFILE_FAILURE, 'error');
