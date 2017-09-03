import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

/**
 * GroupMessages displays the message of a group
 */
class GroupMessages extends React.Component {
  /**
   * render displays the html
   * @method render
   *
   * @return {ReactElement} markup
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
      Messagelist = (JSON.parse(this.props.messages)).map((message, index) =>
        (
          <span>
            <p
              key={index}
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

GroupMessages.propTypes = {
  status: PropTypes.string.isRequired,
  messages: PropTypes.string.isRequired
};

/**
 * mapStateToProps makes the store data available
 * @method mapStateToProps
 * @param  {object} state the store date
 * @return {object} the data needed by the component
 */
const mapStateToProps = (state) => {
  return {
    status: state.setCurrentMessagesReducer.status,
    messages: JSON.stringify(state.setCurrentMessagesReducer.currentMessages)
  };
};

export default connect(mapStateToProps)(GroupMessages);
