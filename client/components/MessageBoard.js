import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Groups from './Groups';
import CreateGroup from './CreateGroup';
import AllMessages from './AllMessages';
import GroupMembers from './GroupMembers';
import GroupMessages from './GroupMessages';
import AddMembers from './AddMembers';
import ArchiveMessages from './ArchiveMessages';
import SentMessages from './SentMessages';
import SendMessage from './SendMessage';
import createGroupAction from '../actions/createGroupAction';
import myMessageAction from '../actions/myMessageAction';
import archivedMessagesAction from '../actions/archivedMessagesAction';
import clearStoreAction from '../actions/clearStoreAction';

/**
 * [myMessages description]
 * @type {[type]}
 */
class MessageBoard extends React.Component {
  /**
   * [constructor description]
   * @method constructor
   * @param  {[type]}    props [description]
   * @return {[type]}          [description]
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
   * [myMessages description]
   * @method myMessages
   * @return {[type]}   [description]
   */
  myMessages() {
    this.props.myMessageAction();
  }
  /**
   * [archivedMessages description]
   * @method archivedMessages
   * @return {[type]}         [description]
   */
  archivedMessages() {
    this.props.archivedMessagesAction();
  }
  /**
   * [showForm description]
   * @method showForm
   * @return {[type]} [description]
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
      this.props.clearStoreAction('sendMessage');
    }
  }
  /**
   * [render description]
   * @method render
   * @return {[type]} [description]
   */
  render() {
    const createGroup = this.props.createGroupAction;
    const groups = this.props.groups;
    const userDetails = JSON.parse(this.props.user_details);
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-4 dashboardholder">
            <div className="deep-purple lighten-4 dashboard">
              <h1 className="row center">
                {userDetails.username}
              </h1>
              <div className="row center">
                <a href="#sentmessages" className="dashboardelement" onClick={this.myMessages} >
                Sent Messages </a>
                <a href="#archivemessages" className="dashboardelement" onClick={this.archivedMessages} >
                Achived Messages </a>
              </div>
            </div>
            <div className="deep-purple lighten-4 groupholder">
              <div className="grp-title deep-purple lighten-4">
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
        <GroupMessages />
        <GroupMembers />
        <AddMembers />
        <ArchiveMessages />
        <SentMessages />
        <SendMessage display={JSON.stringify({ display: this.state.display })} />
        <a
          className="addMessage btn btn-floating btn-large deep-purple lighten-4 pulse"
          title="Send Message Here"
          onClick={this.showForm}
        >
          <i className="material-icons addMessage-edit">{this.state.icon}</i></a>
      </div>
    );
  }
}

MessageBoard.propTypes = {
  createGroupAction: PropTypes.func.isRequired,
  myMessageAction: PropTypes.func.isRequired,
  archivedMessagesAction: PropTypes.func.isRequired,
  groups: PropTypes.string.isRequired,
  clearStoreAction: PropTypes.func.isRequired
};

/**
 * [mapStateToProps description]
 * @method mapStateToProps
 * @param  {[type]}        state [description]
 * @return {[type]}              [description]
 */
function mapStateToProps(state) {
  let groups = 'xcvxcv';
  if (state.getUserGroupsReducer !== undefined) {
    groups = JSON.stringify(state.getUserGroupsReducer.groups);
  }
  return {
    groups,
    user_details: JSON.stringify(state.authUser.user_details)
  };
}

export default connect(mapStateToProps, {
  createGroupAction, myMessageAction, archivedMessagesAction, clearStoreAction })(MessageBoard);
