import React from 'react';
import { connect } from 'react-redux';
import AddMembers from './AddMembers';

class GroupMembers extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      groupId: this.props.groupId
    };
  }
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
        {this.props.groupId}
        <AddMembers />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    groupId: state.setCurrentGroupReducer.current_group
  };
}

export default connect(mapStateToProps)(GroupMembers);
