import * as types from './constants';
import action from 'utils/action';

export const notificationUnReadRequest = action(types.NOTIFICATIONS_FETCH_UNREAD_REQUEST);
export const notificationsUnReadFetched = action(types.NOTIFICATIONS_FETCH_UNREAD_SUCCESS, 'newNotifications');
export const notificationUnReadFetchingError = action(types.NOTIFICATIONS_FETCH_UNREAD_FAILURE, 'error');

export const notificationRequest = action(types.NOTIFICATIONS_FETCH_REQUEST, 'page');
export const notificationsFetched = action(types.NOTIFICATIONS_FETCH_SUCCESS, 'allNotifications');
export const notificationFetchingError = action(types.NOTIFICATIONS_FETCH_FAILURE, 'error');

export const notificationsSeenRequest = action(types.NOTIFICATIONS_SEEN_REQUEST);
export const notificationsSeen = action(types.NOTIFICATIONS_SEEN_SUCCESS, 'response');
export const notificationsSeenFailure = action(types.NOTIFICATIONS_SEEN_FAILURE, 'error');

export const notificationsReadUpdateRequest = action(types.NOTIFICATIONS_READ_UPDATE_REQUEST, 'notificationId');
export const notificationsReadUpdate = action(types.NOTIFICATIONS_READ_UPDATE_SUCCESS, 'response');
export const notificationsReadUpdateFailure = action(types.NOTIFICATIONS_READ_UPDATE_FAILURE, 'error');

export const notificationsCountRequest = action(types.NEW_NOTIFICATIONS_COUNT_REQUEST);
export const notificationsCountSuccess = action(types.NEW_NOTIFICATIONS_COUNT_SUCCESS, 'newNotificationsCount');
export const notificationsCountFailure = action(types.NEW_NOTIFICATIONS_COUNT_FAILURE, 'error');
