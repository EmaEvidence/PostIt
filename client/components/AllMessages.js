import React from 'react';
import { connect } from 'react-redux';

/**
 * [checkIfMessageEmpty description]
 * @type {[type]}
 */
export class AllMessages extends React.Component {
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
      );
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
      <div className="col-sm-7 deep-purple lighten-4 messagecard">
        <h2>{this.props.groupName} Messages</h2>
        { Messagelist }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
  //  groupId: state.setCurrentGroupReducer.current_group,
    status: state.setCurrentMessagesReducer.status,
    messages: state.setCurrentMessagesReducer.current_messages,
    groupName: state.setCurrentMessagesReducer.current_group
  };
}

AllMessages.propTypes = {
};
export default connect(mapStateToProps)(AllMessages);
