import action from 'utils/action';
import * as types from './constants';

export const loadBasicInfoRequest = action(types.LOAD_BASIC_INFO_REQUEST);
export const loadBasicInfoSuccess = action(types.LOAD_BASIC_INFO_SUCCESS, 'response');
export const loadBasicInfoFailure = action(types.LOAD_BASIC_INFO_FAILURE, 'error');


export const clearMessage = action(types.CLEAR_MESSAGE);
