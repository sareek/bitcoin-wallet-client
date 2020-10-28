import { fromJS } from 'immutable';
import * as types from './constants';
import { LOGOUT_SUCCESS } from "containers/Login/constants";

const initialState = fromJS({
  response: null,
  error: null,
  requesting: false,
  success: false,
  newNotificationsCount: 0,
  notifications: {
    dataList: [],
    totalItems: 0,
    currentPage: 0
  },
  currentNotification: {}
});

function showNotifications(state = initialState, action) {
  switch (action.type) {
    case types.NOTIFICATIONS_FETCH_REQUEST:
    case types.NOTIFICATIONS_SEEN_REQUEST:
    case types.NOTIFICATIONS_FETCH_UNREAD_REQUEST:
    // case types.NOTIFICATIONS_READ_UPDATE_REQUEST:
    case types.NEW_NOTIFICATIONS_COUNT_REQUEST:
      return state.merge({
        requesting: true,
        error: null,
        response: null,
        success: false
      });
    case types.NOTIFICATIONS_FETCH_FAILURE:
    case types.NOTIFICATIONS_SEEN_FAILURE:
    case types.NOTIFICATIONS_FETCH_UNREAD_FAILURE:
    case types.NOTIFICATIONS_READ_UPDATE_FAILURE:
    case types.NEW_NOTIFICATIONS_COUNT_FAILURE:
      return state.merge({
        requesting: false,
        response: null,
        error: action.error.message,
        success: false
      });
    case types.NEW_NOTIFICATIONS_COUNT_SUCCESS:
      return state
      .merge({
        requesting: false,
        response: null,
        error: null,
        success: true,
        newNotificationsCount: action.newNotificationsCount.data.new_counts
      });
    case types.NOTIFICATIONS_FETCH_UNREAD_SUCCESS:
      return state
      .merge({
        requesting: false,
        response: null,
        error: null,
        success: true,
        notifications: fromJS(action.newNotifications.data)
      });
    case types.NOTIFICATIONS_FETCH_SUCCESS:
      return state
      .merge({
        requesting: false,
        response: null,
        error: null,
        success: true,
        notifications: fromJS(action.allNotifications.data) // maybe append
      });
    case types.NOTIFICATIONS_SEEN_SUCCESS:
      return state
      .merge({
        requesting: false,
        response: null,
        error: null,
        success: true,
        newNotificationsCount: 0
      }).updateIn(['notifications', 'dataList'], dataList =>  {
        const newList = dataList.map(data => {
          const newData = data.set('seen', true);
          return newData;
        });
        return newList;
      });
    case types.NOTIFICATIONS_READ_UPDATE_REQUEST:
      return state
      .merge({
        requesting: true,
        response: null,
        error: null,
        success: true,
      }).updateIn(['notifications', 'dataList'], dataList =>  {
        const newList = dataList.map(data => {
          if (data.get('_id') === action.notificationId) {
            const newData = data.set('read', true);
            return newData;
          }
          return data;
        });
        return newList;
      });
    case types.NOTIFICATIONS_READ_UPDATE_SUCCESS:
      return state
      .merge({
        requesting: false,
        response: null,
        error: null,
        success: true,
      }).updateIn(['notifications', 'dataList'], dataList =>  {
        const newList = dataList.map(data => {
          if (data.get('_id') === action.response.data._id) {
            const newData = data.set('read', true);
            return newData;
          }
          return data;
        });
        return newList;
      });
    case LOGOUT_SUCCESS:
      return initialState;
    default:
      return state;
  }
}

export default showNotifications;
