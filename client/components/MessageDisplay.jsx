import React from 'react';
import PropTypes from 'prop-types';

import CloseButton from './CloseButton';

/**
 * MessageDisplay displays every message the user has seen
 * @method MessageDisplay
 *
 * @param  {object} props store data passed to the component
 *
 * @return {ReactElement} markup
 */
export const MessageDisplay = (props) => {
  const messages = JSON.parse(props.messages);
  let messageList;
  if (messages.length === 0) {
    messageList = (
      <p>
              No Message Yet
        </p>
      );
  } else {
    messageList = (messages).map((message, index) =>
          (
            <span key={index} >
              <p>
                { message.message }
                <br />
                <i className="chip">Sender: {message.senderUsername}</i>
                <i className="chip">{message.priority}</i>
                <i className="chip">{(message.createdAt).split('T')[0]}</i>
                <i className="chip dropdown">Seen
                  <span className="caret dropdown-toggle" data-toggle="dropdown" />
                  <ul className="dropdown-menu notifications">
                    <li>{message.views ? message.views : 'None' }</li>
                  </ul>
                </i>
              </p>
              <hr />
            </span>
        ));
  }
  return (
    <div id={props.id} className="modal fade reg-form">
      <div className="modal-dialog">
        <h2>{props.type}</h2>
        <div className="messagecard">
          { messageList }
        </div>
        <CloseButton />
      </div>
    </div>
  );
};

MessageDisplay.propTypes = {
  messages: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired
};

export default MessageDisplay;
