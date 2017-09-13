import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

/**
 * ArchiveMessages displays every message the user has seen
 * @method ArchiveMessages
 *
 * @param  {object} props store data passed to the component
 *
 * @return {ReactElement} markup
 */
export const ArchiveMessages = (props) => {
  const archivedMessages = JSON.parse(props.archivedMessages);
  let messageList;
  if (archivedMessages.length === 0) {
    messageList = (
      <p>
              No Message Yet
        </p>
      );
  } else {
    messageList = (archivedMessages).map((message, index) =>
          (
            <p
              key={index}
            >
              { message.message }
              <br />
              <i className="chip">Sender: {message.senderUsername}</i>
              <i className="chip">{message.priority}</i>
              <i className="chip">{(message.createdAt).split('T')[0]}</i>
              <i className="chip">Edit</i>
              <i className="chip">Delete</i><br />
              <i className="chip">Seen by {(message.views)}</i>
            </p>
        ));
  }
  return (
    <div id="archivemessages" className="modal fade reg-form">
      <div className="modal-dialog">
        <h2>Archived Messages</h2>
        <div className="messagecard">
          { messageList }
        </div>
        <button
          type="button"
          className="form-control modal-close deep-purple lighten-4 custombutton"
        >Close</button>
      </div>
    </div>
  );
};

ArchiveMessages.propTypes = {
  archivedMessages: PropTypes.string.isRequired,
};

/**
 * mapStateToProps makes redux store data available to the Component
 * @method mapStateToProps
 *
 * @param  {object} state store
 *
 * @return {object} data needed by the component
 */
const mapStateToProps = (state) => {
  let archivedMessages = '';
  if (state.groupReducer !== undefined) {
    archivedMessages = JSON.stringify(state.archivedMessageReducer.archivedMessages);
  }
  return {
    archivedMessages
  };
};
export default connect(mapStateToProps)(ArchiveMessages);
