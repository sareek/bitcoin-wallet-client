import { takeLatest, take, select, fork, cancel } from "redux-saga/effects";
import { LOCATION_CHANGE } from "react-router-redux";
import * as type from "./constants";
import * as actions from './actions';
import { logoutRequest } from 'containers/Login/actions';
import API from 'utils/apiHelper';
import { makeSelectUser } from 'containers/App/selectors';
import getToken from 'utils/getToken';
import jwtDecode from 'jwt-decode';

function* redirectOnSuccess() {
  yield take(type.UPDATE_PASSWORD_SUCCESS);
}

function* confirmPasswordUpdateFlow(action) {
  const { new_password, old_password } = action.password;
  let userInfo = yield select(makeSelectUser());
  const token = getToken();
  const successWatcher = yield fork(redirectOnSuccess);
  console.log(action)
  try {
    const decoded = jwtDecode(token);
    if (
      typeof decoded === 'object' &&
      decoded.hasOwnProperty('email')
    ) {
      yield fork(
        API.post(
          `change_password/`,
          actions.updatePasswordSuccess,
          actions.updatePasswordFailure,
          { new_password, old_password, email: decoded.email },
          token,
        ),
      );
      yield take([LOCATION_CHANGE, type.UPDATE_PASSWORD_FAILURE]);
      yield cancel(successWatcher);
    }
  } catch (error) {
    throw (error);
  }
}

export default function* profilePasswordWatcher() {
  yield takeLatest(type.UPDATE_PASSWORD_REQUEST, confirmPasswordUpdateFlow);
}