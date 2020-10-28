import {
  takeLatest,
  fork,
  call
} from 'redux-saga/effects';
import {
  notificationsUnReadFetched,
  notificationUnReadFetchingError,
  notificationsFetched,
  notificationFetchingError,
  notificationsSeen,
  notificationsSeenFailure,
  notificationsReadUpdate,
  notificationsReadUpdateFailure,
  notificationsCountSuccess,
  notificationsCountFailure
} from './actions';
import {
  NOTIFICATIONS_FETCH_UNREAD_REQUEST,
  NOTIFICATIONS_FETCH_REQUEST,
  NOTIFICATIONS_SEEN_REQUEST,
  NOTIFICATIONS_READ_UPDATE_REQUEST,
  NEW_NOTIFICATIONS_COUNT_REQUEST
} from './constants';
import API from 'utils/apiHelper';

function* fetchUnReadNotifications() {
  const token = localStorage.getItem('token');

  yield call(
    API.get(
      'notification/all?unread=true',
      notificationsUnReadFetched,
      notificationUnReadFetchingError,
      token
    )
  );
}

function* fetchAllNotifications(action) {
  const token = localStorage.getItem('token');

  yield call(
    API.get(`notification/all?page=${action.page}&perpage=10`, notificationsFetched, notificationFetchingError, token)
  );
}

function* fetchUnseenNotificationStats() {
  const token = localStorage.getItem('token');

  yield call(
    API.get('notification/new', notificationsCountSuccess, notificationsCountFailure, token)
  );
}

function* updateNotificationSeenStatus() {
  const token = localStorage.getItem('token');

  yield fork(
    API.patch(
      'notification/new',
      notificationsSeen,
      notificationsSeenFailure,
      {},
      token
    )
  );
}

function* updateNotificationReadStatus(action) {
  const token = localStorage.getItem('token');
  yield fork(
    API.patch(
      `notification/status/update/${action.notificationId}`,
      notificationsReadUpdate,
      notificationsReadUpdateFailure,
      {},
      token
    )
  );
}

export default function* logWatcher() {
  yield takeLatest(NOTIFICATIONS_FETCH_UNREAD_REQUEST, fetchUnReadNotifications);
  yield takeLatest(NOTIFICATIONS_FETCH_REQUEST, fetchAllNotifications);
  yield takeLatest(NEW_NOTIFICATIONS_COUNT_REQUEST, fetchUnseenNotificationStats);
  yield takeLatest(NOTIFICATIONS_SEEN_REQUEST, updateNotificationSeenStatus);
  yield takeLatest(NOTIFICATIONS_READ_UPDATE_REQUEST, updateNotificationReadStatus);
}
