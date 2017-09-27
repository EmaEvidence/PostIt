import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

/**
 * Notification displays inApp Notification for the user
 * @method Notification
 *
 * @param  {object} props store data passed to the component
 *
 * @return {ReactElement} markup
 */
export const Notification = (props) => {
  const notifications = JSON.parse(props.notifications);
  let notificationList;
  if (notifications.length === 0) {
    notificationList = (
      <li>
          No Notification
      </li>
    );
  } else {
    notificationList = (notifications).map((notification, index) =>
        (
          <li
            key={index}
          >
            { notification.type } posted to { notification.groupName } by { notification.source }
          </li>
      ));
  }
  return (
    <ul className="dropdown-menu notifications">
      {notificationList}
    </ul>
  );
};

Notification.propTypes = {
  notifications: PropTypes.string.isRequired,
};

export default connect(null, {})(Notification);
