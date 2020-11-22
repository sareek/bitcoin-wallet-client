import { fromJS } from 'immutable';
import * as types from './constants';
import { LOGOUT_SUCCESS } from '../Login/constants';

export const initialState = fromJS({
  response: null,
  error: null,
  requesting: false,
  success: false,
  status: null,
  signupResponse: '',
});

function homePageReducer(state = initialState, action = {}) {
  switch (action.type) {

    case types.SIGNUP_REQUEST:
      return state.merge({
        requesting: true,
        error: '',
        response: '',
        signupResponse: '',
      });
   
    case types.USER_SIGNUP_SUCCESS:
      return state.merge({
        requesting: false,
        response: action.response.data.message,
        signupResponse: action.response.data.message,
        error: '',
      });

    case types.USER_SIGNUP_FAILURE:
      return state.merge({
        requesting: false,
        response: '',
        error: action.error.message,
      });
    case types.CLEAR_STATE:
        return initialState;  
    default:
      return state;
  }
}

export default homePageReducer;
