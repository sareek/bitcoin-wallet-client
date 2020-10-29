import React from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { Dropdown } from 'semantic-ui-react';
import {
  notificationUnReadRequest,
  notificationRequest,
  notificationsReadUpdateRequest,
  notificationsCountRequest,
  notificationsSeenRequest,
} from './actions';
import {
  makeSelectSuccess,
  makeSelectResponse,
  makeSelectError,
  makeSelectRequesting,
  makeSelectNotifications,
  // makeSelectNotificationList,
  makeSelectCurrentNotification,
  makeSelectNotificationCount,
} from './selectors';
import NotificationRow from './NotificationRow';
import { isEmpty } from 'utils/helper';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import reducer from './reducer';
import saga from './sagas';
import { compose } from "redux";

const mapStateToProps = createStructuredSelector({
  success: makeSelectSuccess(),
  response: makeSelectResponse(),
  error: makeSelectError(),
  isRequesting: makeSelectRequesting(),
  notifications: makeSelectNotifications(),
  // notificationList: makeSelectNotificationList(),
  currentNotification: makeSelectCurrentNotification(),
  newNotificationCount: makeSelectNotificationCount(),
});

const mapDispatchToProps = (dispatch) => ({
  getNewNotificationStats: () => dispatch(notificationsCountRequest()),
  notificationsSeen: () => dispatch(notificationsSeenRequest()),
  getUnReadNotifications: () => dispatch(notificationUnReadRequest()),
  getAllNotifications: (page) => dispatch(notificationRequest(page)),
  updateNotificationReadStatus: (notificationId) =>
    dispatch(notificationsReadUpdateRequest(notificationId)),
});

class NotificationsPage extends React.Component {
  state = {
    loading: true,
    totalItems: 0,
    currentPage: 1,
    notifications: [],
    isNotificationOpen: false,
  };

  componentDidMount() {
    this.props.getNewNotificationStats();
    this.props.getAllNotifications(1);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.notifications !== this.props.notifications) {
      const { notifications } = this.props;
      if (notifications.size > 0) {
        const notification = notifications.toJS();
        this.setState({
          notifications: [
            // ...this.state.notifications,
            ...notification.dataList,
          ],
          totalItems: notification.totalItems,
          currentPage: notification.currentPage,
        });
      }
    }
  }

  toggleNotification = () => {
    if (this.props.newNotificationCount > 0 && this.state.isNotificationOpen) {
      this.props.notificationsSeen(); // will be triggered on close, if there are any unseen notifications
    }
    this.setState({
      isNotificationOpen: !this.state.isNotificationOpen,
    });
  };

  updateNotificationReadStatus = (_notificationId) => {
    this.props.updateNotificationReadStatus(_notificationId);
  };

  loadMore = () => {
    this.setState(
      {
        currentPage: this.state.currentPage + 1,
      },
      () => {
        this.props.getAllNotifications(this.state.currentPage);
      }
    );
  };

  render() {
    const { totalItems, isNotificationOpen, notifications } = this.state;
    const { newNotificationCount } = this.props;

    return (
      <Dropdown
        item
        className="nav-link"
        trigger={
          <span className="notification" onClick={this.toggleNotification}>
            <i className="icon-bell-o" />
            {newNotificationCount > 0 &&
              (newNotificationCount <= 99
                ? <span className="new_notifications_count">
                  {newNotificationCount}
                </span>
                : <span className="new_notifications_count">
                    99
                    <i className="fa fa-plus" />
                </span>)}
          </span>
        }
        id="notification_dropdown"
        open={isNotificationOpen}
      >
        <Dropdown.Menu>
          <div className="flex">
            <div className="emptyArea" onClick={this.toggleNotification} />
            <div className="content">
              <div className="pd-all-sm">
                <h5 className="thin clearfix">
                  NOTIFICATIONS
                  <span
                    className="float-right pointer"
                    onClick={this.toggleNotification}
                  >
                    <i className="icon-times-circle-o" />
                  </span>
                </h5>
              </div>

              {notifications.map((objData, key) =>
                (<NotificationRow
                  key={key}
                  _id={objData._id}
                  notification={objData.notification}
                  user_id={objData.user_id}
                  added_by={objData.added_by}
                  added_on={objData.added_on}
                  updateNotificationReadStatus={
                    this.updateNotificationReadStatus
                  }
                  seen={objData.seen}
                  read={objData.read}
                />)
              )}
              {notifications.length !== totalItems &&
                notifications.length > 10 &&
                <div onClick={this.loadMore}>show more</div>}
            </div>
          </div>
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

NotificationsPage.propTypes = {
  getNewNotificationStats: PropTypes.func.isRequired,
  notificationsSeen: PropTypes.func.isRequired,
  getUnReadNotifications: PropTypes.func.isRequired,
  updateNotificationReadStatus: PropTypes.func.isRequired,
  getAllNotifications: PropTypes.func.isRequired,
};

const withReducer = injectReducer({ key: 'notifications', reducer });
const withSaga = injectSaga({ key: 'notifications', saga });
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(NotificationsPage);