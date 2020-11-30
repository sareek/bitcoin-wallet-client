import * as types from './constants';
import action from 'utils/action';

export const getWatchOnlyAddressRequest = action(types.GET_WATCHONLY_ADDRESS_REQUEST, 'payload');
export const getWatchOnlyAddressSuccess = action(types.GET_WATCHONLY_ADDRESS_SUCCESS, 'response');
export const getWatchOnlyAddressFailure = action(types.GET_WATCHONLY_ADDRESS_FAILURE, 'error');

export const generateWatchOnlyWalletAddress = action(types.POST_WATCHONLY_WALLET_ADDRESS_REQUEST, 'payload');
export const generateWatchOnlyWalletSuccess = action(types.POST_WATCHONLY_WALLET_ADDRESS_SUCCESS, 'response');
export const generateWatchOnlyWalletFailure = action(types.POST_WATCHONLY_WALLET_ADDRESS_FAILURE, 'error');

export const deleteWatchOnlyWalletAddress = action(types.DELETE_WATCHONLY_WALLET_ADDRESS_REQUEST, 'payload');
export const deleteWatchOnlyWalletSuccess = action(types.DELETE_WATCHONLY_WALLET_ADDRESS_SUCCESS, 'response');
export const deleteWatchOnlyWalletFailure = action(types.DELETE_WATCHONLY_WALLET_ADDRESS_FAILURE, 'error');

export const clearState = action(types.CLEAR_STATE);
