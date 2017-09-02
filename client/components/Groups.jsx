import React from 'react';
import { connect } from 'react-redux';

import setUsersAction from '../actions/setUsersAction';
import setCurrentMessagesAction from '../actions/setCurrentMessagesAction';
import setCurrentMembersAction from '../actions/setCurrentMembersAction';

/**
 * [Groups]
 */
class Groups extends React.Component {
  /**
   * [constructor ]
   * @method constructor
   * @param  {object}    props []
   * @return {void}          []
   */
  constructor(props) {
    super(props);
    this.state = {};
    this.setUsers = this.setUsers.bind(this);
    this.setMessages = this.setMessages.bind(this);
    this.setMembers = this.setMembers.bind(this);
  }
  /**
   * [setUsers adds Users of a group]
   * @method setUsers
   * @param  {interger} index     [id of the group]
   * @param  {string} groupName [name of the group]
   * @return  {void}
   */
  setUsers(index, groupName) {
    this.props.setUsersAction(index, groupName);
  }

  /**
   * [setMessages adds messages of a group]
   * @method setMessages
   * @param  {interger} groupId     [id of the group]
   * @param  {string} groupName [name of the group]
   * @return  {void}
   */
  setMessages(groupId, groupName) {
    this.props.setCurrentMessagesAction(groupId, groupName);
  }

  /**
   * [setMembers populates the store with members of a group]
   * @method setMembers
   * @param  {interger}   index     [id of the group]
   * @param  {string}   groupName [name of the group]
   * @return  {void}
   */
  setMembers(index, groupName) {
    this.props.setCurrentMembersAction(index, groupName);
  }

  /**
   * [render displays the html ]
   * @method render
   * @return {ReactElement} [markup]
   */
  render() {
    const grps = JSON.parse(this.props.groups);
    let grpList = '';
    if (grps['0'] !== undefined) {
      grpList = grps['0'].map(grp =>
        (
          <li
            className="grouplist dropdown"
            key={grp.id}
          > { grp.groupName }&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <span className="right dropdown-toggle clickable" type="button" data-toggle="dropdown">
            More <span className="caret" /> </span>
            <ul className="dropdown-menu mydropDown">
              <li>
                <a
                  className="clickable"
                  onClick={this.showMessage}
                  onClick={this.setMessages.bind(null, grp.id, grp.groupName)}
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
                  onClick={this.setMembers.bind(null, grp.id, grp.groupName)}
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
                  onClick={this.setUsers.bind(null, grp.id, grp.groupName)}
                >
                Add New</a>
              </li>
              <li>
                <a
                  className="modal-close"
                  href="#addmembers"
                  onClick={this.setUsers.bind(null, grp.id, grp.groupName)}
                >
                Archived Messages</a>
              </li>
              <li>
                <a
                  className="modal-close"
                  href="#addmembers"
                  onClick={this.setUsers.bind(null, grp.id, grp.groupName)}
                >
                Edit</a>
              </li>
              <li>
                <a
                  className="modal-close"
                  href="#addmembers"
                  onClick={this.setUsers.bind(null, grp.id, grp.groupName)}
                >
                Delete</a>
              </li>
            </ul>
          </li>
      ));
    } else {
      grpList = <li> No Group Yet</li>;
    }
    return (
      <ul>
        { grpList }
      </ul>
    );
  }
}

Groups.propTypes = {
  setUsersAction: React.PropTypes.func.isRequired,
  setCurrentMessagesAction: React.PropTypes.func.isRequired,
  setCurrentMembersAction: React.PropTypes.func.isRequired,
  groups: React.PropTypes.string.isRequired
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
  setCurrentMembersAction })(Groups);
