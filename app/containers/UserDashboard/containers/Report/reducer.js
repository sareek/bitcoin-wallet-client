import { fromJS } from 'immutable';
import * as types from './constants';
import { LOGOUT_SUCCESS } from 'containers/Login/constants';

const initialState = fromJS({
  loading: '',
  requesting: false,
  response: '',
  reportList: '',
  error: '',
  public_url: ''
});

function agentSettings(state = initialState, action) {
  switch (action.type) {
    case types.GET_REPORT_LISTING_REQUEST:
      return state.merge({
        loading: true,
        response: '',
        reportList: '',
        error: '',
      });

    case types.DOWNLOAD_REPORT_REQUEST:
        return state.merge({
          loading: true,
          response: '',
          error: '',
          public_url: ''
        });   
    case types.GET_REPORT_LISTING_SUCCESS:
      return state.merge({
        loading: false,
        response: '',
        reportList: fromJS(action.response.data)
      });

      case types.DOWNLOAD_REPORT_SUCCESS:
      return state.merge({
        loading: false,
        response: action.response.message,
        error: '',
        public_url: action.response.public_url
      });
   
      case types.GET_REPORT_LISTING_FAILURE:
      case types.DOWNLOAD_REPORT_FAILURE:
      return state.merge({
        error: action.error.message,
        response: '',
        loading: false,
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

export default agentSettings;
