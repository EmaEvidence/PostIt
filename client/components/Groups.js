import React from 'react';
import { connect } from 'react-redux';
import setUsersAction from '../actions/setUsersAction';
import setCurrentMessagesAction from '../actions/setCurrentMessagesAction';
import setCurrentMembersAction from '../actions/setCurrentMembersAction';

/**
 * [state description]
 * @type {Object}
 */
class Groups extends React.Component {
  /**
   * [constructor description]
   * @method constructor
   * @param  {[type]}    props [description]
   * @return {[type]}          [description]
   */
  constructor(props) {
    super(props);
    this.state = {};
    this.setUsers = this.setUsers.bind(this);
    this.setMessages = this.setMessages.bind(this);
    this.setMembers = this.setMembers.bind(this);
  }
  /**
   * [setUsers description]
   * @method setUsers
   * @param  {[type]} index     [description]
   * @param  {[type]} groupName [description]
   * @return  {[type]} groupName [description]
   */
  setUsers(index, groupName) {
    this.props.setUsersAction(index, groupName);
  }

  /**
   * [setMessages description]
   * @method setMessages
   * @param  {[type]}    groupId   [description]
   * @param  {[type]}    groupName [description]
   * @return  {[type]} groupName [description]
   */
  setMessages(groupId, groupName) {
    this.props.setCurrentMessagesAction(groupId, groupName);
  }

  /**
   * [setMembers description]
   * @method setMembers
   * @param  {[type]}   index     [description]
   * @param  {[type]}   groupName [description]
   * @return  {[type]} groupName [description]
   */
  setMembers(index, groupName) {
    this.props.setCurrentMembersAction(index, groupName);
  }

  /**
   * [render description]
   * @method render
   * @return {[type]} [description]
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
          > { grp.group_name }&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <span className="right dropdown-toggle clickable" type="button" data-toggle="dropdown">
            More <span className="caret" /> </span>
            <ul className="dropdown-menu mydropDown">
              <li
                className="clickable"
                onClick={this.showMessage}
                onClick={this.setMessages.bind(null, grp.id, grp.group_name)}
              >
                 Messages</li>
              <li>
                <a
                  className="clickable"
                  data-toggle="modal"
                  data-target="#groupmembers"
                  onClick={this.setMembers.bind(null, grp.id, grp.group_name)}
                >
                   Members
              </a>
            </li>
              <li>
                <a
                  className="modal-close"
                  href="#addmembers"
                  onClick={this.setUsers.bind(null, grp.id, grp.group_name)}
                >
                Add New</a>
              </li>
              <li>
                <a
                  className="modal-close"
                  href="#addmembers"
                  onClick={this.setUsers.bind(null, grp.id, grp.group_name)}
                >
                Edit</a>
              </li>
              <li>
                <a
                  className="modal-close"
                  href="#addmembers"
                  onClick={this.setUsers.bind(null, grp.id, grp.group_name)}
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
 * [mapStateToProps description]
 * @method mapStateToProps
 * @param  {[type]}        state [description]
 * @return {[type]}              [description]
 */
function mapStateToProps(state) {
  return {
    state
  };
}

export default connect(mapStateToProps, { setUsersAction, setCurrentMessagesAction, setCurrentMembersAction })(Groups);
