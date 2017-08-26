import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Notification extends React.Component {
  render() {
    const checkIfMessageEmpty = Object.keys(this.props.notifications);
    let notificationList;
    if (checkIfMessageEmpty.length === 0) {
      notificationList = (
        <li>
            No Message Yet
        </li>
      );
    } else {
      notificationList = (this.props.notifications).map((notification, index) =>
        (
          <p
            key={index}
          >
            { notification.group }
            <br />
            <i className="chip">{notification.author}</i>
            <i className="chip">{notification.time}</i><br />
            <hr />
          </p>
      ));
    }
    return (
      // <div className="dropdown">
      //   <button className="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">Dropdown Example
        // <span className="caret"></span></button>
        <ul className="dropdown-menu">
          { notificationList }
        </ul>
      // </div>
    );
  }
}

Notification.PropTypes = {
  notifications: PropTypes.object
}

function mapStateToProps(state) {
  return ({
    notifications: state.notificationReducer.notification
  });
}
export default connect(mapStateToProps, {})(Notification);
