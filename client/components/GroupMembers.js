import React from 'react';
import { connect } from 'react-redux';
import AddMembers from './AddMembers';

class GroupMembers extends React.Component {
  render() {
    const checkIfMembersEmpty = Object.keys(this.props.members);
    let Memberslist;
    if (checkIfMembersEmpty.length === 0) {
      Memberslist = (
        <p>
            No Member Yet
        </p>
      )
    } else {
      Memberslist = (this.props.members).map((member, index) =>
        (
          <p
            key={index}
          >
            {member.username}
            &nbsp;&nbsp;&nbsp;&nbsp;
            {member.email}
            &nbsp;&nbsp;&nbsp;&nbsp;
            {member.phone}
            <hr />
          </p>
      ));
    }
    return (
      <div id="groupmembers" className="modal fade reg-form" role="dialog">
        <div className="modal-dialog">
          <h2 className="center"> {this.props.groupName} Members </h2>
          <div className="messagecard">
            { Memberslist }
          </div>
          <button
            type="button"
            className="form-control close custombutton"
            data-dismiss="modal"
          >
          Cancel</button>
        </div>
        <AddMembers />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    status: state.setCurrentMembersReducer.status,
    members: state.setCurrentMembersReducer.current_members,
    groupName: state.setCurrentMembersReducer.current_group
  };
}


export default connect(mapStateToProps)(GroupMembers);
