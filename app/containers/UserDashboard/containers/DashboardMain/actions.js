import action from 'utils/action';
import * as types from './constants';

export const loadBasicInfoRequest = action(types.LOAD_BASIC_INFO_REQUEST);
export const loadBasicInfoSuccess = action(types.LOAD_BASIC_INFO_SUCCESS, 'response');
export const loadBasicInfoFailure = action(types.LOAD_BASIC_INFO_FAILURE, 'error');

export const getBitcoinExchangesRequest = action(types.GET_BITCOIN_EXCHANGES_REQUEST);
export const getBitcoinExchangesSuccess = action(types.GET_BITCOIN_EXCHANGES_SUCCESS, 'response');
export const getBitcoinExchangesFailure = action(types.GET_BITCOIN_EXCHANGES_FAILURE, 'error');

export const clearMessage = action(types.CLEAR_MESSAGE);
