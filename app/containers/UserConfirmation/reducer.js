/*
 *
 * UserConfirmation reducer
 *
 */

import { fromJS } from 'immutable';
import * as types from './constants';

const initialState = fromJS({
  response: '',
  error: '',
  requesting: false,
  success: false,
});

function userConfirmationReducer(state = initialState, action={}) {
  switch (action.type) {
    case types.USER_CONFIRAMATION_REQUEST:
    return state.merge({
      requesting: true,
      success: false,
      response: null,
      error: null
    });
    case types.USER_CONFIRAMATION_SUCCESS:
    return state.merge({
      requesting: false,
      success: true,
      response: action.response.message,
      error: null
    });
    case types.USER_CONFIRAMATION_FAILURE:
    return state.merge({
      requesting: false,
      success: true,
      response: null,
      error: action.error.message
    });
    default:
      return initialState;
  }
}

export default userConfirmationReducer;
