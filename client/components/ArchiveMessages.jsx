import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

/**
 * ArchivedMessages displays every message a user as seen
 *
 * @type {object}
 */
export class ArchiveMessages extends React.Component {
  /**
   * render
   * @method render
   *
   * @return {ReactElement} markup
   */
  render() {
    const archivedMessages = JSON.parse(this.props.archivedMessages);
    let messageList;
    if (archivedMessages.length === 0) {
      messageList = (
        <p>
              No Message Yet
        </p>
      );
    } else {
      messageList = (archivedMessages).map(message =>
          (
            <p
              key={message.id}
            >
              { message.message }
              <br />
              <i className="chip">{message.priority}</i>
              <i className="chip">{message.createdAt}</i><br />
              <i className="chip">Edit</i>
              <i className="chip">Delete</i><br />
              <i className="chip">Seen by {JSON.stringify(message.views)}</i>
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
  }
}

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
