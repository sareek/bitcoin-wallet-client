import { createSelector } from 'reselect';

const selectNotification = state => state.get('adminNotifications');

const makeSelectSuccess = () => createSelector(selectNotification, state => state.get('success'));
const makeSelectResponse = () => createSelector(selectNotification, state => state.get('response'));
const makeSelectError = () => createSelector(selectNotification, state => state.get('error'));
const makeSelectRequesting = () => createSelector(selectNotification, state => state.get('requesting'));

const makeSelectNotifications = () => createSelector(selectNotification, state => state.get('notifications'));
const makeSelectNotificationList = () => createSelector(makeSelectNotifications(), state => state.get('dataList'));
const makeSelectCurrentNotification = () => createSelector(selectNotification, state => state.get('currentNotification'));
const makeSelectNotificationCount = () => createSelector(selectNotification, state => state.get('newNotificationsCount'));

export {
  makeSelectSuccess,
  makeSelectResponse,
  makeSelectError,
  makeSelectRequesting,
  makeSelectNotifications,
  makeSelectNotificationList,
  makeSelectCurrentNotification,
  makeSelectNotificationCount
};
