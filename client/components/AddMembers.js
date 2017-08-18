import React from 'react';
import { connect } from 'react-redux';
import UIAutocomplete from 'react-ui-autocomplete';
import AddNewMemberAction from '../actions/AddNewMemberAction';

class AddMembers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: ''
    };
    this.addMember = this.addMember.bind(this);
    this.handleValueChange = this.handleValueChange.bind(this);
  }
  handleValueChange(newValue, displayValue, suggestion) {
    this.setState({
      user: newValue,
    });
  }

  addMember(e){
    e.preventDefault();
    const groupId = this.props.groupId;
    const userId = this.state.user;
    this.props.AddNewMemberAction(groupId, userId);
  }
  render() {
    const getOptions = () => (this.props.users);
    return (
      <div id="addmembers" className="modal fade reg-form">
        <form className="modal-dialog" onSubmit={this.addMember}>
          <h2 className="center"> Add Members </h2>
          <h6 className="center"> { this.props.status }</h6>
          <div className="form-group">
            <label htmlFor="UIAutocomplete"> Add members by username </label>
            <UIAutocomplete
              options={getOptions()}
              onChange={this.handleValueChange}
              optionValue="id"
              optionFilter={['username']}
              optionLabelRender={option => `${option.username}`}
            />
          </div>
          <div className="form-group">
            <input
              type="submit"
              className="form-control btn custombutton deep-purple lighten-3"
              value="Add"
            />
            <button
              type="button"
              className="modal-close btn right deep-purple lighten-4 custombutton"
            >Cancel</button>
          </div>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    groupId: state.setUsersReducer.current_group,
    users: state.setUsersReducer.users,
    status: state.AddNewMemberReducer.status
  };
}
export default connect(mapStateToProps, { AddNewMemberAction })(AddMembers);
