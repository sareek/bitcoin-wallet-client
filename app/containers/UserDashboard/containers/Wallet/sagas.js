import { call, takeLatest } from 'redux-saga/effects';
import * as types from './constants';
import * as actions from './actions';
import API from 'utils/apiHelper';
import getToken from 'utils/getToken';
import jwtDecode from 'jwt-decode';


function* getNewAddressRequest(action) {
  const token = getToken();

  try {
    const decoded = jwtDecode(token);
    if (
      typeof decoded === 'object' &&
      decoded.hasOwnProperty('email') 
    ) {
      yield call(
        API.post(
          `btc/get_addresses/`,
          actions.getNewAddressSuccess,
          actions.getNewAddressFailure,
          {email: decoded.email, address_type: 'wallet', currency_name: 'bitcoin'},
          token,
        ),
      );
    }
  } catch(error) {
    throw(error);
  }
}

function* getBalanceRequest(action) {
  const { btc_address } = action.walletInfo;
  const token = getToken();
  try {
    const decoded = jwtDecode(token);
    if (
      typeof decoded === 'object' &&
      decoded.hasOwnProperty('email') 
    ) {
      yield call(
        API.post(
          `btc/get_balance/`,
          actions.getBalanceSuccess,
          actions.getBalanceFailure,
          {address: btc_address},
          token,
        ),
      );
    }
  } catch(error) {
    throw(error);
  }
}

function* getWallentInfoRequest(action) {
  const token = getToken();
  try {
    const decoded = jwtDecode(token);
    if (
      typeof decoded === 'object' &&
      decoded.hasOwnProperty('email') 
    ) {
      yield call(
        API.post(
          `btc/get_wallet_info/`,
          actions.getWalletInfoSuccess,
          actions.getWalletInfoFailure,
          {email: decoded.email},
          token,
        ),
      );
    }
  } catch(error) {
    throw(error);
  }
}

function* sendWalletAddressService(action) {
  const { btc_amount, from_address, to_address, usd_amount, description  } = action.payload;
  const token = getToken();
  try {
    const decoded = jwtDecode(token);
    if (
      typeof decoded === 'object' &&
      decoded.hasOwnProperty('email') 
    ) {
      yield call(
        API.post(
          `btc/forward_balance/`,
          actions.sendWalletAddressSuccess,
          actions.sendWalletAddressFailure,
          {email: decoded.email, from_address, to_address, usd_amount, btc_amount, description},
          token,
        ),
      );
    }
  } catch(error) {
    throw(error);
  }
}

function* getTransactionInfoRequest() {
  const token = getToken();
  try {
    const decoded = jwtDecode(token);
    if (
      typeof decoded === 'object' &&
      decoded.hasOwnProperty('email') 
    ) {
      yield call(
        API.post(
          `btc/get_transaction/`,
          actions.getTransactionInfoSuccess,
          actions.getTransactionInfoFailure,
          {email: decoded.email, currency: 'bitcoin'},
          token,
        ),
      );
    }
  } catch(error) {
    throw(error);
  }
}


export default function* walletWatcher() {
  yield takeLatest(types.GET_TRANSACTION_INFO_REQUEST, getTransactionInfoRequest);
  yield takeLatest(types.SEND_WALLET_ADDRESS_REQUEST, sendWalletAddressService);
  yield takeLatest(types.GET_NEW_ADDRESS_REQUEST, getNewAddressRequest);
  yield takeLatest(types.GET_BALANCE_REQUEST, getBalanceRequest);
  yield takeLatest(types.GET_WALLENT_INFO_REQUEST, getWallentInfoRequest);
}
