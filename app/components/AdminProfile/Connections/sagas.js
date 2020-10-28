import { takeLatest, take, put, call, select, fork, cancel } from "redux-saga/effects";
import { LOCATION_CHANGE } from "react-router-redux";
import * as types from "./constants";
import * as actions from "./actions";

import API from "utils/apiHelper";
import { makeSelectUser } from 'containers/App/selectors';

function* redirectOnLinkTwitterSuccess() {
  yield take(types.UNLINK_TWITTER_SUCCESS);
}
function* redirectOnUnlinkTwitterSuccess() {
  yield take(types.UNLINK_TWITTER_SUCCESS);
}

function* redirectOnLinkLinkedinSuccess() {
  yield take(types.UNLINK_LINKEDIN_SUCCESS);
}
function* redirectOnUnlinkLinkedinSuccess() {
  yield take(types.UNLINK_LINKEDIN_SUCCESS);
}

function* redirectOnLinkFacebookSuccess() {
  yield take(types.UNLINK_FACEBOOK_SUCCESS);
}
function* redirectOnUnlinkFacebookSuccess() {
  yield take(types.UNLINK_FACEBOOK_SUCCESS);
}

function* redirectOnLinkGoogleSuccess() {
  yield take(types.UNLINK_GOOGLE_SUCCESS);
}
function* redirectOnUnlinkGoogleSuccess() {
  yield take(types.UNLINK_GOOGLE_SUCCESS);
}

function* redirectOnGetConnectionsSuccess() {

}

function* getConnectionsFlow() {
  const token = localStorage.getItem('token');
  const successWatcher = yield fork(redirectOnGetConnectionsSuccess);

  yield fork(
    API.get(
      `api/social-account/status`,
      actions.getConnectionStatusSuccess,
      actions.getConnectionStatusFailure,
      token
    )
  );
  yield take([LOCATION_CHANGE, types.GET_CONNECTION_STATUS_FAILURE]);
  yield cancel(successWatcher);
}

function* linkGoogleRequestFlow(action) {
  const token = localStorage.getItem('token');

  const successWatcher = yield fork(redirectOnLinkGoogleSuccess, token);
  yield fork(
    API.post(
      `api/social-account/link/google/${action.payload}`,
      actions.linkGoogleSuccess,
      actions.linkGoogleFailure,
      {},
      token
    )
  );

  yield take([LOCATION_CHANGE, types.LINK_GOOGLE_FAILURE]);
  yield cancel(successWatcher);
}

function* unlinkGoogleRequestFlow(action) {
  const token = localStorage.getItem('token');

  const successWatcher = yield fork(redirectOnUnlinkGoogleSuccess, token);
  yield fork(
    API.delete(
      `api/social-account/unlink/google`,
      actions.unlinkGoogleSuccess,
      actions.unlinkGoogleFailure,
      token
    )
  );

  yield take([LOCATION_CHANGE, types.UNLINK_GOOGLE_FAILURE]);
  yield cancel(successWatcher);
}

function* linkFacebookRequestFlow(action) {
  const token = localStorage.getItem('token');

  const successWatcher = yield fork(redirectOnLinkFacebookSuccess, token);

  yield fork(
    API.post(
      `api/social-account/link/facebook/${action.payload}`,
      actions.linkFacebookSuccess,
      actions.linkFacebookFailure,
      {},
      token
    )
  );

  yield take([LOCATION_CHANGE, types.LINK_FACEBOOK_FAILURE]);
  yield cancel(successWatcher);
}

function* unlinkFacebookRequestFlow(action) {
  const token = localStorage.getItem('token');

  const successWatcher = yield fork(redirectOnUnlinkFacebookSuccess, token);
  yield fork(
    API.delete(
      `api/social-account/unlink/facebook`,
      actions.unlinkFacebookSuccess,
      actions.unlinkFacebookFailure,
      token
    )
  );

  yield take([LOCATION_CHANGE, types.UNLINK_FACEBOOK_FAILURE]);
  yield cancel(successWatcher);
}

function* linkLinkedinRequestFlow(action) {
  const token = localStorage.getItem('token');

  const successWatcher = yield fork(redirectOnLinkLinkedinSuccess, token);
  yield fork(
    API.post(
      `api/social-account/link/linkedin/${action.payload}?redirect_uri=${action.redirect_uri}`,
      actions.linkLinkedinSuccess,
      actions.linkLinkedinFailure,
      {},
      token
    )
  );

  yield take([LOCATION_CHANGE, types.LINK_LINKEDIN_FAILURE]);
  yield cancel(successWatcher);
}

function* unlinkLinkedinRequestFlow(action) {
  const token = localStorage.getItem('token');
  const successWatcher = yield fork(redirectOnUnlinkLinkedinSuccess, token);
  yield fork(
    API.delete(
      `api/social-account/unlink/linkedin`,
      actions.unlinkLinkedinSuccess,
      actions.unlinkLinkedinFailure,
      token
    )
  );

  yield take([LOCATION_CHANGE, types.UNLINK_LINKEDIN_FAILURE]);
  yield cancel(successWatcher);
}

function* linkTwitterRequestFlow(action) {
  const token = localStorage.getItem('token');

  const successWatcher = yield fork(redirectOnLinkTwitterSuccess, token);

  yield fork(
    API.post(
      `api/social-account/link/twitter/${action.payload}`,
      actions.linkTwitterSuccess,
      actions.linkTwitterFailure,
      {},
      token
    )
  );
  yield take([LOCATION_CHANGE, types.LINK_TWITTER_FAILURE]);
  yield cancel(successWatcher);
}

function* unlinkTwitterRequestFlow(action) {
  const token = localStorage.getItem('token');

  const successWatcher = yield fork(redirectOnUnlinkTwitterSuccess, token);
  yield fork(
    API.delete(
      `api/social-account/unlink/twitter`,
      actions.unlinkTwitterSuccess,
      actions.unlinkTwitterFailure,
      token
    )
  );
  yield take([LOCATION_CHANGE, types.UNLINK_TWITTER_FAILURE]);
  yield cancel(successWatcher);
}

export default function* addConnectionsWatcher() {
  yield takeLatest(types.GET_CONNECTION_STATUS_REQUEST, getConnectionsFlow);
  yield takeLatest(types.LINK_FACEBOOK_REQUEST, linkFacebookRequestFlow);
  yield takeLatest(types.UNLINK_FACEBOOK_REQUEST, unlinkFacebookRequestFlow);
  yield takeLatest(types.LINK_GOOGLE_REQUEST, linkGoogleRequestFlow);
  yield takeLatest(types.UNLINK_GOOGLE_REQUEST, unlinkGoogleRequestFlow);
  yield takeLatest(types.LINK_LINKEDIN_REQUEST, linkLinkedinRequestFlow);
  yield takeLatest(types.UNLINK_LINKEDIN_REQUEST, unlinkLinkedinRequestFlow);
  yield takeLatest(types.LINK_TWITTER_REQUEST, linkTwitterRequestFlow);
  yield takeLatest(types.UNLINK_TWITTER_REQUEST, unlinkTwitterRequestFlow);
}


