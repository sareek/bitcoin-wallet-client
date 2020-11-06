import * as types from './constants';
import action from "utils/action";

export const getAddressRequest = action(types.GET_ADDRESS_REQUEST, 'payload');
export const getAddressSuccess = action(types.GET_ADDRESS_SUCCESS, 'response');
export const getAddressFailure = action(types.GET_ADDRESS_FAILURE, 'error');

export const generateWalletAddress = action(types.POST_WALLET_ADDRESS_REQUEST, 'payload');
export const generateWalletSuccess = action(types.POST_WALLET_ADDRESS_SUCCESS, 'response');
export const generateWalletFailure = action(types.POST_WALLET_ADDRESS_FAILURE, 'error');

export const clearState = action(types.CLEAR_STATE);
