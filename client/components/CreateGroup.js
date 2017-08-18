import React from 'react';
import { connect } from 'react-redux';
import getUserGroupsAction from '../actions/getUserGroupsAction';

class CreateGroup extends React.Component {
  constructor(props){
    super(props);
    this.createGroup = this.createGroup.bind(this);
    this.state = {
      groupname: '',
      purpose: '',
      members: '',
      status: ''
    };
    this.onChange = this.onChange.bind(this);
    this.createGroup = this.createGroup.bind(this);
  }
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  createGroup(e) {
    e.preventDefault();
    const members = this.refs.members.value;
    const groupData = {
      gpname: this.state.groupname,
      purpose: this.state.purpose,
      users: members
    };
    if (this.props.status === 'Group creation Successful') {
      this.props.getUserGroupsAction(this.props.userId);
    }
    this.props.createGroupAction(groupData)
    .then(($) => {
      this.props.getUserGroupsAction(this.props.userId);
      $('#creategroup').modal('hide');
    });
  }

  render() {
    return (
      <div id="creategroup" className="modal fade reg-form" role="dialog">
        <form className="modal-dialog" onSubmit={this.createGroup}>
          <h2> Create a Group </h2>
          <span>{this.props.status}</span>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="What will you like to call your Group?"
              required
              value={this.state.groupname}
              onChange={this.onChange}
              name="groupname"
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Purpose (optional)"
              required
              value={this.state.purpose}
              onChange={this.onChange}
              name="purpose"
            />
          </div>
          <div className="form-group">
            <label> Add members by username </label>
            <div className="chips chips-autocomplete" />
            <input
              type="hidden"
              id="members"
              value=""
              name="members"
              ref="members"
            />
          </div>
          <div className="form-group">
            <input
              type="submit"
              className="form-control btn custombutton deep-purple lighten-3"
              value="Create"
            />
            <button
              type="button"
              className="form-control close custombutton"
              data-dismiss="modal"
            >Cancel</button>
          </div>
        </form>
      </div>
    );
  }
}

CreateGroup.propTypes = {
  createGroupAction: React.PropTypes.func.isRequired,
  status: React.PropTypes.string.isRequired,
  getUserGroupsAction: React.PropTypes.func.isRequired,
  userId: React.PropTypes.string.isRequired
};

function mapStateToProps(state) {
  let status = 'xcvxcv';
  if (state.createGroupReducer !== undefined) {
    status = state.createGroupReducer.status;
  }
  return {
    status,
    userId: state.authUser.user_details.id
  };
}

export default connect(mapStateToProps, { getUserGroupsAction })(CreateGroup);
