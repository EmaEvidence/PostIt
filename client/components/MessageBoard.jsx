import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Groups from './Groups';
import CreateGroup from './CreateGroup';
import AllMessages from './AllMessages';
import GroupMembers from './GroupMembers';
import AddMembers from './AddMembers';
import MessageDisplay from './MessageDisplay';
import SendMessage from './SendMessage';
import createGroupAction from '../actions/createGroupAction';
import myMessageAction from '../actions/myMessageAction';
import archivedMessagesAction from '../actions/archivedMessagesAction';

/**
 * MessageBoard
 */
export class MessageBoard extends React.Component {
  /**
   * constructor
   * @method constructor
   *
   * @param  {object}  props
   *
   * @return {object} state
   */
  constructor(props) {
    super(props);
    this.myMessages = this.myMessages.bind(this);
    this.state = {
      display: 'none',
      icon: 'edit'
    };
    this.showForm = this.showForm.bind(this);
  }
  /**
   * myMessages displays messages sent by the user
   * @method myMessages
   *
   * @return {void}
   */
  myMessages() {
    this.props.myMessageAction();
  }
  /**
   * archivedMessages displays all messages seen by the user
   * @method archivedMessages
   *
   * @return {void}
   */
  archivedMessages() {
    this.props.archivedMessagesAction();
  }
  /**
   * showForm displays the form for sending a message
   * @method showForm
   *
   * @return {object} new state
   */
  showForm() {
    if (this.state.display === 'none') {
      this.setState({
        display: 'block',
        icon: 'close'
      });
    } else {
      this.setState({
        display: 'none',
        icon: 'edit'
      });
    }
  }
  /**
   * render displays the html
   * @method render
   *
   * @return {ReactElement} markup
   */
  render() {
    const createGroup = this.props.createGroupAction;
    const groups = this.props.groups;
    const userDetails = JSON.parse(this.props.userDetails);
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-4 dashboardholder">
            <div className="dashboard">
              <h1 className="row center">
                {userDetails.username}
              </h1>
              <div className="row center">
                <a
                  href="#sentmessages"
                  className="dashboardelement"
                  onClick={this.myMessages}
                >
                Sent Messages </a>
                <a
                  href="#creategroup"
                  className="modal-trigger"
                >
                  Create a Group </a>
              </div>
            </div>
            <div className="groupholder">
              <div className="grp-title">
                <h3 className="center">Groups</h3>
              </div>
              <div className="grps">
                <Groups groups={groups} />
              </div>
            </div>
          </div>
          <div className="col-sm-1" />
          <AllMessages />
        </div>
        <CreateGroup
          createGroupAction={createGroup}
          group={groups[0]}
        />
        <GroupMembers />
        <AddMembers />
        <MessageDisplay
          id={'sentmessages'}
          type={'Sent Messages'}
          messages={this.props.sentMessages}
        />
        <MessageDisplay
          id={'archivemessages'}
          type={'Archived Messages'}
          messages={this.props.archivedMessages}
        />
        <SendMessage display={JSON.stringify({ display: this.state.display })} />
        <a
          className="addMessage btn btn-floating btn-large deep-purple lighten-2 pulse"
          title="Send Message Here"
          onClick={this.showForm}
          role="button"
          tabIndex={0}
        >
          <i
            className="material-icons addMessage-edit tooltipped"
            data-position="top"
            data-delay="50"
            data-tooltip="Send Messages Here"
          >{this.state.icon}</i></a>
      </div>
    );
  }
}

MessageBoard.propTypes = {
  createGroupAction: PropTypes.func.isRequired,
  myMessageAction: PropTypes.func.isRequired,
  archivedMessagesAction: PropTypes.func.isRequired,
  groups: PropTypes.string.isRequired,
  userDetails: PropTypes.string.isRequired,
  archivedMessages: PropTypes.string.isRequired,
  sentMessages: PropTypes.string.isRequired
};

/**
 * mapStateToProps makes the store data available
 * @method mapStateToProps
 *
 * @param  {object} state the store date
 *
 * @return {object} the data needed by the component
 */
const mapStateToProps = (state) => {
  let groups = 'xcvxcv';
  if (state.groupReducer !== undefined) {
    groups = JSON.stringify(state.groupReducer.groups);
  }
  return {
    groups,
    userDetails: JSON.stringify(state.authUser.userDetails),
    archivedMessages: JSON.stringify(state.archivedMessageReducer.archivedMessages),
    sentMessages: JSON.stringify(state.myMessagesReducer.myMessages)
  };
};

export default connect(mapStateToProps, {
  createGroupAction, myMessageAction, archivedMessagesAction })(MessageBoard);
