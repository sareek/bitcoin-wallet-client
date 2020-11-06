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
          `btc/generate_wallet_address/`,
          actions.getNewAddressSuccess,
          actions.getNewAddressFailure,
          {email: decoded.email, label: 'default'},
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

export default function* walletWatcher() {
  yield takeLatest(types.GET_NEW_ADDRESS_REQUEST, getNewAddressRequest);
  yield takeLatest(types.GET_BALANCE_REQUEST, getBalanceRequest);
  yield takeLatest(types.GET_WALLENT_INFO_REQUEST, getWallentInfoRequest);
}
