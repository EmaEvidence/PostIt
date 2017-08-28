import React from 'react';
import { connect } from 'react-redux';
import AddMembers from './AddMembers';

/**
 * [checkIfMembersEmpty description]
 * @type {[type]}
 */
class GroupMembers extends React.Component {
  /**
   * [render description]
   * @method render
   * @return {[type]} [description]
   */
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
            &nbsp;&nbsp;&nbsp;&nbsp;
            <button className="btn deep-purple lighten-3"> X </button>
            <hr />
          </p>
      ));
    }
    return (
      <div id="groupmembers" className="modal fade reg-form" role="dialog">
        <div className="modal-dialog">
          <div>
            <h2 className="center"> {this.props.groupName} Members </h2>
          </div>
          <div className="messagecard">
            { Memberslist }
          </div>
          <div>
            <button
              type="button"
              className="form-control close custombutton"
              data-dismiss="modal"
            >
            Cancel</button>
          </div>
        </div>
        <AddMembers />
      </div>
    );
  }
}

/**
 * [mapStateToProps description]
 * @method mapStateToProps
 * @param  {[type]}        state [description]
 * @return {[type]}              [description]
 */
const mapStateToProps = (state) => {
  return {
    status: state.setCurrentMembersReducer.status,
    members: state.setCurrentMembersReducer.current_members,
    groupName: state.setCurrentMembersReducer.current_group
  };
};


export default connect(mapStateToProps)(GroupMembers);
