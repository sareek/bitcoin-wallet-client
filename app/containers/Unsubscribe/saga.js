import {
  take,
  takeLatest,
  fork,
  call,
  put,
  select,
  cancel,
} from 'redux-saga/effects';
import { LOCATION_CHANGE, push } from 'react-router-redux';
import * as types from './constants';
import * as actions from './actions';
import Agriculture from 'utils/apiHelper';

function* redirectOnSuccess() {
  const action = yield take(types.UNSUBSCRIBE_USER_SUCCESS);
  // executed on successful action
  // yield put(push("/next-route"));
}

function* unsubscribeRequest(action) {
  const { token } = action;
  const successWatcher = yield fork(redirectOnSuccess);
  yield fork(
    Agriculture.get(
      `newsletter/unsubscribe/${token}`,
      actions.unsubscribeSuccess,
      actions.unsubscribeFailure,
      '',
    ),
  );
  yield take([LOCATION_CHANGE, types.UNSUBSCRIBE_USER_FAILURE]);
  yield cancel(successWatcher);
}

// Individual exports for testing
export default function* unsubscribeWatcher() {
  // See example in containers/HomePage/sagas.js
  yield takeLatest(types.UNSUBSCRIBE_USER_REQUEST, unsubscribeRequest);
}

// All sagas to be loaded
// export default [unsubscribeWatcher];
