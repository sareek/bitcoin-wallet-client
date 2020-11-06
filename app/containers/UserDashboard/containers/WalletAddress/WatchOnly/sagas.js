import { takeLatest, take, select, fork, cancel } from "redux-saga/effects";
import { LOCATION_CHANGE } from "react-router-redux";
import * as type from "./constants";
import { updatePasswordSuccess, updatePasswordFailure } from "./actions";
import { logoutRequest } from 'containers/Login/actions';
import API from 'utils/apiHelper';
import { makeSelectUser } from 'containers/App/selectors';
import getToken from 'utils/getToken';

// function* getWatchOnlyAddressService(action) {
//   const token = getToken();
// }

export default function* watchOnlyWatcher() {
  // yield takeLatest(type.GET_WATCH_ONLY_ADDRESS_REQUEST, getWatchOnlyAddressService);
}