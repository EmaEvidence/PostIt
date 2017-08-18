import React from 'react';
import { connect } from 'react-redux';

/**
 * [archivedMessages description]
 * @type {[type]}
 */
class ArchiveMessages extends React.Component {
  /**
   * [render description]
   * @method render
   * @return {[type]} [description]
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
              <i className="chip">Delete</i>
              <hr />
            </p>
        ));
    }
    return (
      <div id="archivemessages" className="modal fade reg-form">
        <div className="modal-dialog">
          <h2> Archived Messages </h2>
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
  archivedMessages: React.PropTypes.string.isRequired,
};

/**
 * [mapStateToProps description]
 * @method mapStateToProps
 * @param  {[type]}        state [description]
 * @return {[type]}              [description]
 */
function mapStateToProps(state) {
  let archivedMessages = '';
  if (state.getUserGroupsReducer !== undefined) {
    archivedMessages = JSON.stringify(state.archivedMessagesReducer.archivedMessages);
  }
  return {
    archivedMessages
  };
}
export default connect(mapStateToProps)(ArchiveMessages);
