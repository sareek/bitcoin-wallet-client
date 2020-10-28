/*
 *
 * Unsubscribe actions
 *
 */

import action from 'utils/action';
import * as types from './constants';

export const unsubscribeRequest = action(
  types.UNSUBSCRIBE_USER_REQUEST,
  'token',
);
export const unsubscribeSuccess = action(
  types.UNSUBSCRIBE_USER_SUCCESS,
  'response',
);
export const unsubscribeFailure = action(
  types.UNSUBSCRIBE_USER_FAILURE,
  'error',
);
