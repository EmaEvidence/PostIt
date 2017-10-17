import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import messageSeenAction from '../actions/messageSeenAction';

/**
 * AllMessages displays Allmessages for a group
 */
export class AllMessages extends React.Component {
  /**
   * componentDidUpdate sends messages as read.
   * @method componentDidUpdate
   *
   * @return {function} action for marking meassages as read
   */
  componentDidUpdate() {
    if ((JSON.parse(this.props.messages)).length !== 0) {
      const messages = JSON.parse(this.props.messages);
      this.props.messageSeenAction(messages);
    }
  }
  /**
   * render displays the html
   * @method render
   * @return {ReactElement} markup
   */
  render() {
    const checkIfMessageEmpty = Object.keys(JSON.parse(this.props.messages));
    let Messagelist;
    if (checkIfMessageEmpty.length === 0) {
      Messagelist = (
        <p>
            No new Message.
        </p>
      );
    } else {
      let messages = JSON.parse(this.props.messages);
      messages = messages.sort((a, b) =>
      b.createdAt.localeCompare(a.createdAt));
      Messagelist = messages.map((message, index) =>
        (
          <li key={index}>
            <span
              id={`message${message.id}`}
            >
              { message.message }
              <br />
              <i className="chip">Sender: {message.senderUsername}</i>
              <i className="chip">{message.priority}</i>
              <i className="chip">{(message.createdAt).split('T')[0]}</i>
              <i className="chip dropdown" href="">
                Seen
                <span
                  className="caret dropdown-toggle"
                  data-toggle="dropdown"
                />
                <ul className="dropdown-menu notifications">
                  <li>{message.views ? message.views : 'None' }</li>
                </ul>
              </i>
            </span>
            <hr />
          </li>
      ));
    }
    return (
      <div className="col-sm-7 messagecard">
        <h2>
          { this.props.groupName ?
            `Messages for ${this.props.groupName}` : 'Please Select a Group.'}
        </h2>
        <div>
          <ul>
            { Messagelist }
          </ul>
        </div>
      </div>
    );
  }
}
/**
 * mapStateToProps makes the store data available
 * @method mapStateToProps
 *
 * @param  {object} state the store date
 *
 * @return {object} the data needed by the component
 */
const mapStateToProps = (state) => {
  return {
    status: state.setCurrentMessagesReducer.status,
    messages: JSON.stringify(state.setCurrentMessagesReducer.currentMessages),
    groupName: state.setCurrentMessagesReducer.currentGroup
  };
};

AllMessages.propTypes = {
  messages: PropTypes.string.isRequired,
  groupName: PropTypes.string.isRequired,
  messageSeenAction: PropTypes.func.isRequired
};
export default connect(mapStateToProps, { messageSeenAction })(AllMessages);
