import { fromJS } from 'immutable';
import * as types from './constants';
import { LOGOUT_SUCCESS } from 'containers/Login/constants';

const initialState = fromJS({
  loading: '',
  requesting: false,
  basicInfoRequesting: false,
  response: '',
  error: '',
  user: {}
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
