import { call, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import * as types from './constants';
import * as actions from './actions';
import API from 'utils/apiHelper';
import getToken from 'utils/getToken';
import jwtDecode from 'jwt-decode';

function* getAddressRequest(action) {
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
            actions.getAddressSuccess,
            actions.getAddressFailure,
            {email: decoded.email, currency_name: 'bitcoin'},
            token,
          ),
        );
      }
    } catch(error) {
      throw(error);
    }
  }

  function* generateWalletAddressService(action) {
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
            `btc/generate_wallet_address/`,
            actions.generateWalletSuccess,
            actions.generateWalletFailure,
            {label: label, email: decoded.email},
            token,
          ),
        );
      }
    } catch(error) {
      throw(error);
    }
  }

  function* deleteWalletAddressService(action) {
    const {  } = action.payload;
    const token = getToken();
    try {
      const decoded = jwtDecode(token);
      if (
        typeof decoded === 'object' &&
        decoded.hasOwnProperty('email') 
      ) {
        // yield call(
        //   API.post(
        //     `btc/delete_wallet_address/`,
        //     actions.deleteWalletSuccess,
        //     actions.deleteWalletFailure,
        //     {label: label, email: decoded.email},
        //     token,
        //   ),
        // );
      }
    } catch(error) {
      throw(error);
    }
  }


export default function* walletsListWatcher() {
  yield takeLatest(types.GET_ADDRESS_REQUEST, getAddressRequest);
  yield takeLatest(types.DELETE_WALLET_ADDRESS_REQUEST, deleteWalletAddressService);
  yield takeLatest(types.POST_WALLET_ADDRESS_REQUEST, generateWalletAddressService);
}
