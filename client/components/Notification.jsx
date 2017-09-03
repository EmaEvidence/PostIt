import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

/**
 * Notification component
 * @type {type}
 */
export class Notification extends React.Component {
  /**
   * constructor
   * @method constructor
   *
   * @param  {object} props
   *
   * @return {void}
   */
  constructor(props) {
    super(props);
  }
  /**
   * render displays the html
   * @method render
   *
   * @return {ReactElement} markup
   */
  render() {
    const notifications = JSON.parse(this.props.notifications);
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
        <li> {notificationList} </li>
      </ul>
    );
  }
}

Notification.propTypes = {
  notifications: PropTypes.string.isRequired,
};

export default connect(null, {})(Notification);
