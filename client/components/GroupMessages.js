import React from 'react';
import { connect } from 'react-redux';

/**
 * [checkIfMessageEmpty description]
 * @type {[type]}
 */
class GroupMessages extends React.Component {
  /**
   * [render description]
   * @method render
   * @return {[type]} [description]
   */
  render() {
    const checkIfMessageEmpty = Object.keys(this.props.messages);
    let Messagelist;
    if (checkIfMessageEmpty.length === 0) {
      Messagelist = (
        <p>
            No Message Yet
        </p>
      )
    } else {
      Messagelist = (this.props.messages).map((message, index) =>
        (
          <p
            key={index}
          >
            { message.message }
            <br />
            <i className="chip">{message.priority}</i>
            <i className="chip">{message.createdAt}</i><br />
            <hr />
          </p>
      ));
    }
    return (
      <div id="groupmessages" className="modal fade reg-form" role="dialog">
        <div className="modal-dialog">
          <h2> Group Messages </h2>
          <span>{this.props.status}</span>
          <div className="messagecard">
            { Messagelist }
          </div>
          <button
            type="button"
            className="form-control close custombutton"
            data-dismiss="modal"
          >Cancel</button>
        </div>
      </div>
    );
  }
}

/**
 * [mapStateToProps description]
 * @method mapStateToProps
 * @param  {[type]}        state [description]
 * @return {[type]}              [description]
 */
function mapStateToProps(state) {
  return {
  //  groupId: state.setCurrentGroupReducer.current_group,
    status: state.setCurrentMessagesReducer.status,
    messages: state.setCurrentMessagesReducer.current_messages
  };
}

export default connect(mapStateToProps)(GroupMessages);
