import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

/**
 * SentMessages displays every message sent by the user
 * @method SentMessages
 *
 * @param  {object} props store data passed to the component
 *
 * @return {ReactElement} markup
 */
export const SentMessages = (props) => {
  const myMessages = JSON.parse(props.myMessages);
  let MessageList;
  if (myMessages.length === 0) {
    MessageList = (
      <p>
            No Message Yet
      </p>
      );
  } else {
    MessageList = (myMessages).map(message =>
          (
            <p
              key={message.id}
            >
              { message.message }
              <br />
              <i className="chip">{message.priority}</i>
              <i className="chip">{(message.createdAt).split('T')[0]}</i>
              <i className="chip">Seen by {(message.views)}</i>
            </p>
        ));
  }
  return (
    <div id="sentmessages" className="modal fade reg-form" role="dialog">
      <div className="modal-dialog">
        <div>
          <h2>Sent Messages</h2>
        </div>
        <div className="messagecard">
          { MessageList }
        </div>
        <button
          type="button"
          className="form-control modal-close deep-purple lighten-4 custombutton"
        >Close</button>
      </div>
    </div>
  );
};
SentMessages.propTypes = {
  myMessages: PropTypes.string.isRequired,
};

/**
 * mapStateToProps makes the store data available
 * @method mapStateToProps
 *
 * @param  {object} state the store date
 *
 * @return {object} the data needed by the component
 */
const mapStateToProps = (state) => {
  let myMessages = '';
  if (state.groupReducer !== undefined) {
    myMessages = JSON.stringify(state.myMessagesReducer.myMessages);
  }
  return {
    myMessages
  };
};
export default connect(mapStateToProps)(SentMessages);
