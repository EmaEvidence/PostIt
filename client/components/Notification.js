import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Notification extends React.Component {
  constructor(props){
    super(props);
    this.clearNotification = this.clearNotification.bind(this);
  }
  clearNotification(event, notificationId) {
    console.log( event);
  }
  render() {
    const notifications = this.props.notifications;
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
            onMouseOver={this.clearNotification.bind(event, notification.id)}
          >
            { notification.type } in { notification.groupName || notification.groupId}
          </li>
      ));
    }
    return (
      <ul className="dropdown-menu notifications">
        { notificationList }
      </ul>
    );
  }
}

Notification.PropTypes = {
  notifications: PropTypes.object
}

export default connect(null, {})(Notification);
