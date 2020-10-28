import { fromJS } from 'immutable';
import * as types from './constants';
import { LOGOUT_SUCCESS } from 'containers/Login/constants';

const initialState = fromJS({
  loading: false,
  referCode: '',
  response: '',
  error: '',
  requesting: false,
  graphData: ''
});

function graphData(state = initialState, action) {
  switch (action.type) {
    case types.GET_GRAPH_REQUEST:
    case types.DOWNLOAD_REPORT_REQUEST:
      return state.merge({
        requesting: true,
        response: '',
        error: '',
        graphData: ''
      });
    case types.GET_GRAPH_SUCCESS:
      return state.merge({
        response: action.response.message,
        error: '',
        requesting: false,
        graphData: action.response.data
      });

    case types.DOWNLOAD_REPORT_SUCCESS:
      return state.merge({
        response: action.response.message,
        error: '',
        requesting: false,
      });

    case types.GET_GRAPH_FAILURE:
    case types.DOWNLOAD_REPORT_FAILURE:
      return state.merge({
        requesting: false,
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

export default graphData;
