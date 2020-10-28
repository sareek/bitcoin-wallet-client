import { take, takeLatest, takeEvery, call, fork, cancel, put } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import omit from 'lodash/omit';
import pick from 'lodash/pick';
import { LOCATION_CHANGE, push } from 'react-router-redux';
import * as types from './constants';
import * as actions from './actions';
import  API  from 'utils/apiHelper';
import getToken from 'utils/getToken';

function* redirectOnSuccess() {
  const action = yield take(types.SUBMIT_SUPPORT_SUCCESS);
  // yield call(delay, 5000);
  // yield put(actions.clearResponse());
}

function* submitSupportFlow(action) {
  const token = getToken();
  const successWatcher = yield fork(redirectOnSuccess);
  const data = action.payload;
  const dataBody = omit(data, 'attachments');
  const attachments = pick(data, 'attachments');

  yield fork(
    API.multipartPost(
      `support-feedback/ticket`,
      actions.submitSupportSuccess,
      actions.submitSupportFailure,
      dataBody,
      attachments.attachments,
      token
    )
  );
  yield take([LOCATION_CHANGE, types.SUBMIT_SUPPORT_FAILURE]);
  yield cancel(successWatcher);
}

function* getSupportTicketsFlow(action) {
  const token = getToken();
  // const successWatcher = yield fork(redirectOnSuccess);
  yield fork(
    API.get(
      `support-feedback/data?page=${action.page}&perpage=${action.perpage}&name=${action.query.name}&subject=${
        action.query.subject}&status_ticket=closed`,
      actions.getSupportTicketsSuccess,
      actions.getSupportTicketsFailure,
      token
    )
  );
  yield take([LOCATION_CHANGE, types.GET_SUPPORT_TICKETS_FAILURE]);
  // yield cancel(successWatcher);
}

function* getSupportTicketByIdFlow(action) {
  const token = getToken();
  yield fork(
    API.get(
      `support-feedback/data/${action.payload}?fetch_all=true`,
      actions.getSupportTicketByIdSuccess,
      actions.getSupportTicketByIdFailure,
      token
    )
  );
  yield take([LOCATION_CHANGE, types.GET_SUPPORT_TICKETS_FAILURE]);
}

function* closeSupportTicketByIdFlow(action) {
  const token = getToken();
  yield fork(
    API.put(
      `support-feedback/close-ticket/${action.payload}`,
      actions.closeSupportTicketByIdSuccess,
      actions.closeSupportTicketByIdFailure,
      {_id: action.payload},
      token,
      'put'
    )
  );
  yield take([LOCATION_CHANGE, types.CLOSE_SUPPORT_TICKET_BY_ID_FAILURE]);
}

function* replySupportTicketByIdFlow(action) {
  const token = getToken();
  yield fork(
    API.put(
      `support-feedback/reply-ticket/${action.payload}`,
      actions.replySupportTicketByIdSuccess,
      actions.replySupportTicketByIdFailure,
      {
        _id: action.payload,
        reply_message: action.message
      },
      token,
      'put',
    )
  );
  yield take([LOCATION_CHANGE, types.REPLY_SUPPORT_TICKET_BY_ID_REQUEST]);
}

function* getOpenTicketsFlow(action) {
  const token = getToken();
  yield fork(
    API.get(
      `support-feedback/data?page=${action.page}&perpage=${action.perpage}&status_ticket=open`,
      actions.getOpenTicketsSuccess,
      actions.getOpenTicketsFailure,
      token
    )
  );
  yield take([LOCATION_CHANGE, types.GET_OPEN_TICKETS_FAILURE]);
}

export default function* supportWatcher() {
  yield takeLatest(types.SUBMIT_SUPPORT_REQUEST, submitSupportFlow);
  yield takeLatest(types.GET_SUPPORT_TICKETS_REQUEST, getSupportTicketsFlow);
  yield takeLatest(types.GET_SUPPORT_TICKET_BY_ID_REQUEST, getSupportTicketByIdFlow);
  yield takeLatest(types.CLOSE_SUPPORT_TICKET_BY_ID_REQUEST, closeSupportTicketByIdFlow);
  yield takeLatest(types.REPLY_SUPPORT_TICKET_BY_ID_REQUEST, replySupportTicketByIdFlow);
  yield takeLatest(types.GET_OPEN_TICKETS_REQUEST, getOpenTicketsFlow);
}

// export default [supportWatcher];
