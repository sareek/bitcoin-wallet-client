/*
 *
 * Unsubscribe reducer
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

function unsubscribeReducer(state = initialState, action = {}) {
  switch (action.type) {
    case types.UNSUBSCRIBE_USER_REQUEST:
      return state.merge({
        requesting: true,
        success: false,
        response: '',
        error: '',
      });
    case types.UNSUBSCRIBE_USER_SUCCESS:
      return state.merge({
        requesting: false,
        success: true,
        response: action.response.message,
        error: '',
      });

    case types.UNSUBSCRIBE_USER_FAILURE:
      return state.merge({
        requesting: false,
        success: false,
        response: '',
        error: action.error.message,
      });

    default:
      return state;
  }
}

export default unsubscribeReducer;
