import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { Dropdown } from "semantic-ui-react";

const NotificationRow = ({
  _id,
  notification,
  user_id,
  added_by,
  added_on,
  updateNotificationReadStatus,
  seen,
  user
}) => {
  let timeSpan = 0;
  const dateNow = new Date();
  let dateDiff = moment(dateNow).diff(moment(added_on), "seconds");
  if (dateDiff > 59) {
    dateDiff = moment(dateNow).diff(moment(added_on), "minutes");
    if (dateDiff > 59) {
      dateDiff = moment(dateNow).diff(moment(added_on), "hours");
      if (dateDiff > 24) {
        dateDiff = moment(dateNow).diff(moment(added_on), "days");
        timeSpan = dateDiff + `${dateDiff > 1 ? " days" : " day"} ago`;
      } else {
        timeSpan = dateDiff + `${dateDiff > 1 ? " hours" : " hour"} ago`;
      }
    } else {
      timeSpan = dateDiff + `${dateDiff > 1 ? " mins" : " min"} ago`;
    }
  } else {
    timeSpan = dateDiff + `${dateDiff > 1 ? " seconds" : " second"} ago`;
  }
  return (
    <Dropdown.Item>
      <div className="notification_row clearfix">
        {user && <img className="notification_row_img" src={user} alt="user" />}
        <div className="notification_row_title">{notification}</div>
        <div className="text-sm text-muted notification_row_date">
          {timeSpan}
        </div>
        <span
          className="button link right-btm has-icon"
          onClick={() => updateNotificationReadStatus(_id)}
        >
          <i className="icon-check" />
        </span>
      </div>
    </Dropdown.Item>
  );
};

NotificationRow.defaultProps = {
  notification: "",
  user_id: "",
  added_by: "",
  seen: false
};

NotificationRow.propTypes = {
  _id: PropTypes.string.isRequired,
  notification: PropTypes.string.isRequired,
  user_id: PropTypes.string.isRequired,
  added_by: PropTypes.string.isRequired,
  added_on: PropTypes.string.isRequired,
  updateNotificationReadStatus: PropTypes.func.isRequired,
  seen: PropTypes.bool.isRequired
};

export default NotificationRow;
