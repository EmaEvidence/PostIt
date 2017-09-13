import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import setUsersAction from '../actions/setUsersAction';
import setCurrentMessagesAction from '../actions/setCurrentMessagesAction';
import setCurrentMembersAction from '../actions/setCurrentMembersAction';
import archivedMessageAction from '../actions/archivedMessageAction';

/**
 * Groups
 */
export class Groups extends React.Component {
  /**
   * constructor
   * @method constructor
   * @param  {object} props
   * @return {void}
   */
  constructor(props) {
    super(props);
    this.state = {};
    this.setArchivedMessages = this.setArchivedMessages.bind(this);
    this.setUsers = this.setUsers.bind(this);
    this.setMessages = this.setMessages.bind(this);
    this.setMembers = this.setMembers.bind(this);
  }
  /**
   * setUsers adds Users of a group
   * @method setUsers
   *
   * @param  {interger} index id of the group
   *
   * @param  {string} groupName name of the group
   * @return  {void}
   */
  setUsers(index, groupName) {
    this.props.setUsersAction(index, groupName);
  }
  /**
   * setArchivedMessages
   * @method setArchivedMessages
   *
   * @param  {number} groupId  unique identifier of the group
   * @param  {string} groupName description
   * @return {void}
   */
  setArchivedMessages(groupId, groupName) {
    this.props.archivedMessageAction(groupId, groupName);
  }

  /**
   * setMessages adds messages of a group
   * @method setMessages
   *
   * @param  {interger} groupId id of the group
   * @param  {string} groupName name of the group
   *
   * @return  {void}
   */
  setMessages(groupId, groupName) {
    this.props.setCurrentMessagesAction(groupId, groupName);
  }

  /**
   * setMembers populates the store with members of a group
   * @method setMembers
   *
   * @param  {interger} index id of the group
   * @param  {string} groupName name of the group
   *
   * @return  {void}
   */
  setMembers(index, groupName) {
    this.props.setCurrentMembersAction(index, groupName);
  }

  /**
   * render displays the html
   * @method render
   *
   * @return {ReactElement} markup
   */
  render() {
    const groups = JSON.parse(this.props.groups);
    let groupList = '';
    if (groups['0'] !== undefined && groups['0'].length !== 0) {
      groupList = groups['0'].map(group =>
        (
          <li
            className="grouplist dropdown"
            key={group.id}
          > { group.groupName }&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <span className="right dropdown-toggle clickable" type="button" data-toggle="dropdown">
            More <span className="caret" /> </span>
            <ul className="dropdown-menu mydropDown">
              <li>
                <a
                  className="clickable"
                  onClick={this.setMessages.bind(null, group.id, group.groupName)}
                  role="button"
                  tabIndex={0}
                >
                   Messages
                 </a>
              </li>
              <li>
                <a
                  className="clickable"
                  data-toggle="modal"
                  data-target="#groupmembers"
                  onClick={this.setMembers.bind(null, group.id, group.groupName)}
                  role="button"
                  tabIndex={0}
                >
                   Members
              </a>
              </li>
              <li>
                <a
                  className="modal-close"
                  href="#addmembers"
                  onClick={this.setUsers.bind(null, group.id, group.groupName)}
                >
                Add New</a>
              </li>
              <li>
                <a
                  className="modal-close"
                  href="#archivemessages"
                  onClick={this.setArchivedMessages.bind(null, group.id, group.groupName)}
                >
                Archived Messages</a>
              </li>
              <li>
                <a
                  className="modal-close"
                  href="#addmembers"
                  onClick={this.setUsers.bind(null, group.id, group.groupName)}
                >
                Edit</a>
              </li>
              <li>
                <a
                  className="modal-close"
                  href="#addmembers"
                  onClick={this.setUsers.bind(null, group.id, group.groupName)}
                >
                Delete</a>
              </li>
            </ul>
          </li>
      ));
    } else {
      groupList = <li> No Group Yet</li>;
    }
    return (
      <ul>
        { groupList }
      </ul>
    );
  }
}

Groups.propTypes = {
  setUsersAction: PropTypes.func.isRequired,
  setCurrentMessagesAction: PropTypes.func.isRequired,
  setCurrentMembersAction: PropTypes.func.isRequired,
  groups: PropTypes.string.isRequired,
  archivedMessageAction: PropTypes.func.isRequired
};

/**
 * mapStateToProps makes the store data available
 * @method mapStateToProps
 * @param  {object} state the store date
 * @return {object} the data needed by the component
 */
const mapStateToProps = (state) => {
  return {
    state
  };
};

export default connect(mapStateToProps, { setUsersAction,
  setCurrentMessagesAction,
  setCurrentMembersAction,
  archivedMessageAction })(Groups);
