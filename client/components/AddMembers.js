import React from 'react';
import { connect } from 'react-redux';
import UIAutocomplete from 'react-ui-autocomplete';
import addNewMemberAction from '../actions/addNewMemberAction';

class AddMembers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: ''
    };
    this.addMember = this.addMember.bind(this);
    this.handleValueChange = this.handleValueChange.bind(this);
  }
  /**
   * [handleValueChange gets the value supplied in the Select autocomplete]
   * @method handleValueChange
   * @param  {[type]}          newValue     [ the value of the selected option]
   * @param  {[string]}          displayValue [the value the select options displays]
   * @param  {[string]}          suggestion   [the suggestions the auto complete gives]
   * @return {[object]}                       [writes the selected option value to the state]
   */
  handleValueChange(newValue, displayValue, suggestion) {
    this.setState({
      user: newValue,
    });
  }
  /**
   * [addMember dispatches an action that adds a new mwmber to the database]
   * @method addMember
   * @param  {[type]}  event []
   * @return {[function]} []
   */
  addMember(event) {
    event.preventDefault();
    const groupId = this.props.groupId;
    const userId = this.state.user;
    this.props.addNewMemberAction(groupId, userId);
  }
  /**
   * [render ]
   * @method render
   * @return {[type]} []
   */
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

AddMembers.PropTypes = {
  addNewMemberAction: React.PropTypes.func.isRequired,
  groupId: React.PropTypes.number.isRequired
};
/**
 * [mapStateToProps makes the data in the redux store available to this component]
 * @method mapStateToProps
 * @param  {[object]}        state [the entire redux store]
 * @return {[object]}              [the bit made available for this component]
 */
function mapStateToProps(state) {
  return {
    groupId: state.setUsersReducer.current_group,
    users: state.setUsersReducer.users,
    status: state.addNewMemberReducer.status
  };
}
export default connect(mapStateToProps, { addNewMemberAction })(AddMembers);
