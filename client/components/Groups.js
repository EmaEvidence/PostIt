import React from 'react';
import { connect } from 'react-redux';
import setUsersAction from '../actions/setUsersAction';
import setCurrentMessagesAction from '../actions/setCurrentMessagesAction';
import setCurrentMembersAction from '../actions/setCurrentMembersAction';

class Groups extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
    this.setUsers = this.setUsers.bind(this);
    this.setMessages = this.setMessages.bind(this);
    this.setMembers = this.setMembers.bind(this);
  }

  setUsers(index, groupName) {
    this.props.setUsersAction(index, groupName);
  }

  setMessages(groupId, groupName) {
    this.props.setCurrentMessagesAction(groupId, groupName);
  }
  setMembers(index, groupName) {
    this.props.setCurrentMembersAction(index, groupName);
  }
  render() {
    const grps = this.props.groups;
    let grpList = '';
    if (grps['0'] !== undefined) {
      grpList = grps['0'].map((grp, index) =>
        (
          <li
            className="grouplist"
            key={grp.id}
          > { grp.group_name }&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <span
              className="new badge deep-purple lighten-3 clickable"
              data-toggle=""
              data-target=""
              onClick={this.showMessage}
              onClick={this.setMessages.bind(null, grp.id, grp.group_name)}
            >
              {grp.messages} Messages</span>
            <span
              className="badge deep-purple lighten-5 clickable"
              data-toggle="modal"
              data-target="#groupmembers"
              onClick={this.setMembers.bind(null, grp.id, grp.group_name)}
            >
              {grp.messages} Members
          </span>
            <a
              className="waves-effect waves-light modal-close"
              href="#addmembers"
              onClick={this.setUsers.bind(null, grp.id, grp.group_name)}
            >
            Add New</a>
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
  setCurrentMembersAction: React.PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    state
  };
}

export default connect(mapStateToProps, { setUsersAction, setCurrentMessagesAction, setCurrentMembersAction })(Groups);
