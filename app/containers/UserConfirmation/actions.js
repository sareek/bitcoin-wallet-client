/*
 *
 * UserConfirmation actions
 *
 */

import action from "utils/action";
import * as types from './constants';

export const loadUserConfirmationRequest = action(types.USER_CONFIRAMATION_REQUEST, 'id');
export const loadUserConfirmationSuccess = action(types.USER_CONFIRAMATION_SUCCESS, 'response');
export const loadUserConfirmationFailure = action(types.USER_CONFIRAMATION_FAILURE, 'error');