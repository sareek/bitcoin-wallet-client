import * as types from './constants';
import action from 'utils/action';

export const userSignUpRequests = action(types.SIGNUP_REQUEST, 'data');
export const userSignUpSuccess = action(types.USER_SIGNUP_SUCCESS, 'response');
export const userSignUpFailure = action(types.USER_SIGNUP_FAILURE, 'error');

export const clearState = action(types.CLEAR_STATE);