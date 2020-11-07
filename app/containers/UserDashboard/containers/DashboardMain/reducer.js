import { fromJS } from 'immutable';
import * as types from './constants';
import { LOGOUT_SUCCESS } from 'containers/Login/constants';

const initialState = fromJS({
  loading: '',
  requesting: false,
  basicInfoRequesting: false,
  bitcoinExchangeDataRequesting: false,
  response: '',
  error: '',
  user: {},
  bitcoinExchangeData: {}
});

function userDashboardReducer(state = initialState, action) {
  switch (action.type) {
  case types.LOAD_BASIC_INFO_REQUEST: 
    return state.merge({
      basicInfoRequesting: true,
      response: null,
      error: null,
      message: '',
      isLoading: true
    });

  case types.LOAD_BASIC_INFO_SUCCESS:
    return state.merge({
      isLoading: false,
      basicInfoRequesting: false,
      error: null,
      response: null,
      success: true,
      user: action.response.data && action.response.data.userInfo && fromJS(action.response.data.userInfo)
    });

  case types.GET_BITCOIN_EXCHANGES_REQUEST:
    return state.merge({
      bitcoinExchangeDataRequesting: true,
      error: null,
      message: '',
      isLoading: true
    });

  case types.GET_BITCOIN_EXCHANGES_SUCCESS:
    return state.merge({
      loading: false,
      bitcoinExchangeDataRequesting: false,
      bitcoinExchangeData: fromJS(action.response.data)
    });

  case types.GET_BITCOIN_EXCHANGES_FAILURE:
    return state.merge({
      loading: false,
      bitcoinExchangeDataRequesting: false,
      error: action.error.message
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

export default userDashboardReducer;
