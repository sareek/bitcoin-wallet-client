import * as types from './constants';
import action from "utils/action";

export const getAddressRequest = action(types.GET_ADDRESS_REQUEST, 'payload');
export const getAddressSuccess = action(types.GET_ADDRESS_SUCCESS, 'response');
export const getAddressFailure = action(types.GET_ADDRESS_FAILURE, 'error');

export const basicInfoClearState = action(types.BASIC_INFO_CLEAR_STATE);
