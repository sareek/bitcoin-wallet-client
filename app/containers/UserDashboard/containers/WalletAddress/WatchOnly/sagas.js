import { call, takeLatest } from 'redux-saga/effects';
import API from 'utils/apiHelper';
import * as types from './constants';
import * as actions from './actions';
import getToken from 'utils/getToken';
import jwtDecode from 'jwt-decode';


function* getWatchOnlyAddressRequest(action) {
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
          actions.getWatchOnlyAddressSuccess,
          actions.getWatchOnlyAddressFailure,
          {email: decoded.email, address_type: 'watch_only', currency_name: 'bitcoin'},
          token,
        ),
      );
    }
  } catch(error) {
    throw(error);
  }
}

function* generateWatchOnlyWalletAddressService(action) {
  const { label } = action.payload;
  const token = getToken();
  try {
    const decoded = jwtDecode(token);
    if (
      typeof decoded === 'object' &&
      decoded.hasOwnProperty('email') 
    ) {
      yield call(
        API.post(
          `btc/generate_watch_only_address/`,
          actions.generateWatchOnlyWalletSuccess,
          actions.generateWatchOnlyWalletFailure,
          {label: label, email: decoded.email},
          token,
        ),
      );
    }
  } catch(error) {
    throw(error);
  }
}

export default function* watchOnlyWatcher() {
  yield takeLatest(types.GET_WATCHONLY_ADDRESS_REQUEST, getWatchOnlyAddressRequest);
  yield takeLatest(types.POST_WATCHONLY_WALLET_ADDRESS_REQUEST, generateWatchOnlyWalletAddressService);
}