import * as types from './constants';
import action from 'utils/action';

export const getWatchOnlyAddressRequest = action(types.GET_WATCH_ONLY_ADDRESS_REQUEST, 'payload');
export const getWatchOnlyAddressSuccess = action(types.GET_WATCH_ONLY_ADDRESS_SUCCESS, 'response');
export const getWatchOnlyAddressFailure = action(types.GET_WATCH_ONLY_ADDRESS_FAILURE, 'error');

export const clearState = action(types.CLEAR_STATE);
