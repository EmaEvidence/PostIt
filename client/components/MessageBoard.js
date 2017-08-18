import React from 'react';
import { connect } from 'react-redux';
import Groups from './Groups';
import CreateGroup from './CreateGroup';
import AllMessages from './AllMessages';
import GroupMembers from './GroupMembers';
import GroupMessages from './GroupMessages';
import AddMembers from './AddMembers';
import ArchiveMessages from './ArchiveMessages';
import SentMessages from './SentMessages';
import createGroupAction from '../actions/createGroupAction';
import myMessageAction from '../actions/myMessageAction';
import archivedMessagesAction from '../actions/archivedMessagesAction';

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
   * [render description]
   * @method render
   * @return {[type]} [description]
   */
  render() {
    const createGroup = this.props.createGroupAction;
    const groups = this.props.groups;
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-4 dashboardholder">
            <div className="deep-purple lighten-4 dashboard">
              <h1 className="row center">
                <input
                  id="icon_prefix"
                  type="search"
                  placeholder="Search Post"
                  className="validate center"
                />
              </h1>
              <div className="row center">
                <a href="#sentmessages" className="dashboardelement" onClick={this.myMessages} >
                Sent Messages </a>
                <a href="#archivemessages" className="dashboardelement" onClick={this.archivedMessages} > Achived Messages </a>
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
      </div>
    );
  }
}

MessageBoard.propTypes = {
  createGroupAction: React.PropTypes.func.isRequired,
  myMessageAction: React.PropTypes.func.isRequired,
  archivedMessagesAction: React.PropTypes.func.isRequired,
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
    groups = state.getUserGroupsReducer.groups;
  }
  return {
    groups
  };
}

export default connect(mapStateToProps, {
  createGroupAction, myMessageAction, archivedMessagesAction })(MessageBoard);
