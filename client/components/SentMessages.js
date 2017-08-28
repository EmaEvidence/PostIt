import React from 'react';
import { connect } from 'react-redux';

/**
 * [myMessages description]
 * @type {[type]}
 */
export class SentMessages extends React.Component {
  render() {
    const myMessages = JSON.parse(this.props.myMessages);
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
              <i className="chip">{message.createdAt}</i><br />
              <i className="chip">Edit</i>
              <i className="chip">Delete</i>
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
  }
}
SentMessages.propTypes = {
  myMessages: React.PropTypes.string.isRequired,
};

/**
 * [mapStateToProps description]
 * @method mapStateToProps
 * @param  {[type]}        state [description]
 * @return {[type]}              [description]
 */
const mapStateToProps = (state) => {
  let myMessages = '';
  if (state.getUserGroupsReducer !== undefined) {
    myMessages = JSON.stringify(state.myMessagesReducer.myMessages);
  }
  return {
    myMessages
  };
}
export default connect(mapStateToProps)(SentMessages);
