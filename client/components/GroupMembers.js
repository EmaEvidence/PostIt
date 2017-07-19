import React from 'react';
import AddMembers from './AddMembers';

class GroupMembers extends React.Component {
  render() {
    return (
      <div id="groupmembers" className="modal fade reg-form" role="dialog">
        <div className="modal-dialog">
          <h2> Group Members </h2>
          <div className="messagecard">
            <p>
              emmanuel Alabi
              <hr />
            </p>
            <p>
              Ayo Ade
              <hr />
            </p>
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

export default GroupMembers;
