import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import AddMembers from './AddMembers';

/**
 * GroupMembers displays every membwe of a group
 * @method GroupMembers
 *
 * @param  {object} props store data passed to the component
 *
 * @return {ReactElement} markup
 */
export const GroupMembers = (props) => {
  const checkIfMembersEmpty = Object.keys(JSON.parse(props.members));
  let Memberslist;
  if (checkIfMembersEmpty.length === 0) {
    Memberslist = (
      <p>
            No Member Yet
        </p>
      );
  } else {
    Memberslist = (JSON.parse(props.members)).map((member, index) =>
        (
          <span key={index}>
            <p>
              {member.username}
              &nbsp;&nbsp;&nbsp;&nbsp;
              {member.email}
              &nbsp;&nbsp;&nbsp;&nbsp;
              {member.phone}
              &nbsp;&nbsp;&nbsp;&nbsp;
            </p>
            <hr />
          </span>
      ));
  }
  return (
    <div id="groupmembers" className="modal fade reg-form" role="dialog">
      <div className="modal-dialog">
        <div>
          <h2 className="center"> Members of {props.groupName} </h2>
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
};

GroupMembers.propTypes = {
  members: PropTypes.string.isRequired,
  groupName: PropTypes.string.isRequired
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
  return {
    status: state.setCurrentMembersReducer.status,
    members: JSON.stringify(state.setCurrentMembersReducer.currentMembers),
    groupName: state.setCurrentMembersReducer.currentGroup
  };
};


export default connect(mapStateToProps)(GroupMembers);
