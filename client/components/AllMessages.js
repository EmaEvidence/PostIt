import React from 'react';
import PropTypes from 'prop-types';
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
      Messagelist = (this.props.messages).map(message =>
        (
          <span>
            <p
              key={message.id}
            >
              { message.message }
              <br />
              <i className="chip">{message.priority}</i>
              <i className="chip">{message.createdAt}</i><br />
            </p>
            <hr />
          </span>
      ));
    }
    return (
      <div className="col-sm-7 deep-purple lighten-4 messagecard">
        <h2>{ this.props.groupName ? `${this.props.groupName} Messages` : 'Please Select a Group.'} </h2>
        <div>
          { Messagelist }
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
    messages: state.setCurrentMessagesReducer.current_messages,
    groupName: state.setCurrentMessagesReducer.current_group
  };
}

AllMessages.propTypes = {
  messages: PropTypes.array.isRequired,
  groupName: PropTypes.string.isRequired,
};
export default connect(mapStateToProps)(AllMessages);
