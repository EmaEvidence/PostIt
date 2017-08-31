import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

/**
 * [Notification description]
 * @type {type}
 */
export class Notification extends React.Component {
  /**
   * [constructor description]
   * @method constructor
   * @param  {object}    props []
   * @return {void}          []
   */
  constructor(props) {
    super(props);
    this.clearNotification = this.clearNotification.bind(this);
  }
  /**
   * [render displays the html ]
   * @method render
   * @return {ReactElement} [markup]
   */
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
            onMouseOver={this.clearNotification.bind(null, notification.id)}
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

Notification.propTypes = {
  notifications: PropTypes.object.isRequired
};

export default connect(null, {})(Notification);
