import action from 'utils/action';
import * as types from './constants';


export const sendWalletAddressRequest = action(
  types.SEND_WALLET_ADDRESS_REQUEST,
  'payload'
);
export const sendWalletAddressSuccess = action(
  types.SEND_WALLET_ADDRESS_SUCCESS,
  'response',
);
export const sendWalletAddressFailure = action(
  types.SEND_WALLET_ADDRESS_FAILURE,
  'error',
);

export const getNewAddressRequest = action(
  types.GET_NEW_ADDRESS_REQUEST,
);
export const getNewAddressSuccess = action(
  types.GET_NEW_ADDRESS_SUCCESS,
  'response',
);
export const getNewAddressFailure = action(
  types.GET_NEW_ADDRESS_FAILURE,
  'error',
);

export const getWalletInfoRequest = action(
  types.GET_WALLENT_INFO_REQUEST, 
);
export const getWalletInfoSuccess = action(
  types.GET_WALLENT_INFO_SUCCESS,
  'response',
);
export const getWalletInfoFailure = action(
  types.GET_WALLENT_INFO_FAILURE,
  'error',
);

export const getBalanceRequest = action(
  types.GET_BALANCE_REQUEST,
  'walletInfo'
);
export const getBalanceSuccess = action(
  types.GET_BALANCE_SUCCESS,
  'response',
);
export const getBalanceFailure = action(
  types.GET_BALANCE_FAILURE,
  'error',
);

export const clearMessage = action(types.CLEAR_MESSAGE);
