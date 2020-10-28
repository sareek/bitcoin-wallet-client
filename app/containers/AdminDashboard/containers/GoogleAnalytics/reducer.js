import { fromJS } from 'immutable';
import { LOGOUT_SUCCESS } from 'containers/Login/constants';
import * as types from './constants';

const initialState = fromJS({
  response: '',
  error: '',
  requesting: false,
  success: false,
  dataObj: {},
  reportData: {},
});

function googleAnalyticsReducer(state = initialState, action = {}) {
  switch (action.type) {
    case types.LOAD_ANALYTICS_INFO_REQUEST:
    case types.UPDATE_ANALYTICS_INFO_REQUEST:
    case types.LOAD_ANALYTICS_REPORT_REQUEST:
      return state.merge({
        requesting: true,
        success: false,
        response: '',
        error: '',
      });
    case types.LOAD_ANALYTICS_INFO_SUCCESS:
      return state.merge({
        requesting: false,
        success: true,
        response: '',
        error: '',
        dataObj: fromJS(action.response.data),
      });
    case types.LOAD_ANALYTICS_REPORT_SUCCESS:
      return state.merge({
        requesting: false,
        success: true,
        response: '',
        error: '',
        reportData: fromJS(action.response.data),
      });
    case types.UPDATE_ANALYTICS_INFO_SUCCESS:
      return state.merge({
        requesting: false,
        success: true,
        response: action.response.message,
        error: '',
      });

    case types.LOAD_ANALYTICS_INFO_FAILURE:
    case types.UPDATE_ANALYTICS_INFO_FAILURE:
    case types.LOAD_ANALYTICS_REPORT_FAILURE:
      return state.merge({
        requesting: false,
        success: false,
        response: '',
        error: action.error.message,
      });

    case types.CLEAR_MESSAGE:
      return state.merge({
        response: '',
        error: '',
      });
    case LOGOUT_SUCCESS:
      return initialState;
    default:
      return state;
  }
}

export default googleAnalyticsReducer;
