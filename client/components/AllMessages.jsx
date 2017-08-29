import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

/**
 * [AllMessages displays Allmessages for a group]
 */
export class AllMessages extends React.Component {
  /**
   * [constructor]
   * @method constructor
   * @param  {object}    props [properties of the Component]
   * @return {void}          []
   */
  constructor(props) {
    super(props);
    this.seenMessage = this.seenMessage.bind(this);
  }
  /**
   * [seenMessage marks a message as seen]
   * @method seenMessage
   * @param  {interger}    messageId [id of the message]
   * @return {void}              []
   */
  seenMessage(messageId) {
    document.getElementById(`message${messageId}`).removeEventListener('click', this.seenMessage());
  }
  /**
   * [render displays the html ]
   * @method render
   * @return {ReactElement} [markup]
   */
  render() {
    const checkIfMessageEmpty = Object.keys(JSON.parse(this.props.messages));
    let Messagelist;
    if (checkIfMessageEmpty.length === 0) {
      Messagelist = (
        <p>
            No Message Yet
        </p>
      );
    } else {
      Messagelist = (JSON.parse(this.props.messages)).map(message =>
        (
          <span>
            <p
              key={message.id}
              onmouseEnter={this.seenMessage.bind(null, message.id)}
              id={`message${message.id}`}
            >
              { message.message }
              <br />
              <i className="chip">{message.priority}</i>
              <i className="chip">{(message.createdAt).split('T')[0]}</i><br />
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
 * [mapStateToProps makes the store data available]
 * @method mapStateToProps
 * @param  {object}        state [the store date]
 * @return {object}              [ the data needed by the component]
 */
const mapStateToProps = (state) => {
  return {
  //  groupId: state.setCurrentGroupReducer.current_group,
    status: state.setCurrentMessagesReducer.status,
    messages: JSON.stringify(state.setCurrentMessagesReducer.current_messages),
    groupName: state.setCurrentMessagesReducer.current_group
  };
};

AllMessages.propTypes = {
  messages: PropTypes.string.isRequired,
  groupName: PropTypes.string.isRequired,
};
export default connect(mapStateToProps)(AllMessages);
