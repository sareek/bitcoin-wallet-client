import { fromJS } from 'immutable';
import * as types from './constants';
import { LOGOUT_SUCCESS } from 'containers/Login/constants';

const initialState = fromJS({
  loading: '',
  requesting: false,
  response: '',
  newAddress: {},
  currentBalance: {},
  walletInfo: {},
  error: '',
});

function walletSettings(state = initialState, action) {
  switch (action.type) {
    case types.GET_NEW_ADDRESS_REQUEST:
    case types.GET_BALANCE_REQUEST:  
    case types.GET_WALLENT_INFO_REQUEST:
      return state.merge({
        loading: true,
        response: '',
        newAddress: '',
        error: '',
      });
 
    case types.GET_NEW_ADDRESS_SUCCESS:
      return state.merge({
        loading: false,
        response: '',
        newAddress: fromJS(action.response.data)
      });
    case types.GET_BALANCE_SUCCESS:
        return state.merge({
          loading: false,
          response: '',
          currentBalance: fromJS(action.response.data)
        });

    case types.GET_WALLENT_INFO_SUCCESS:
        return state.merge({
          loading: false,
          response: '',
          walletInfo: fromJS(action.response.data)
        });

    case types.GET_NEW_ADDRESS_FAILURE:
    case types.GET_BALANCE_FAILURE:
    case types.GET_WALLENT_INFO_FAILURE:
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

export default walletSettings;
