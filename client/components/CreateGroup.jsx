import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Chips from 'react-chips';

import getUserGroupsAction from '../actions/getUserGroupsAction';
import getUsersAction from '../actions/getUsersAction';
import SubmitButton from './SubmitButton';
import CloseButton from './CloseButton';

/**
 * createGroup component for creating new group
 */
export class CreateGroup extends React.Component {
  /**
   * constructor creates the state
   *
   * @method constructor
   * @param  {object} props
   *
   * @return {void}
   */
  constructor(props) {
    super(props);
    this.state = {
      groupName: '',
      purpose: '',
      members: [],
      status: ''
    };
    this.onChange = this.onChange.bind(this);
    this.createGroup = this.createGroup.bind(this);
    this.clearState = this.clearState.bind(this);
    this.createGroup = this.createGroup.bind(this);
    this.chipOnChange = this.chipOnChange.bind(this);
  }
  /**
   * componentWillMount description
   * @method componentWillMount
   *
   * @return {array} all application user
   */
  componentWillMount() {
    this.props.getUsersAction();
  }
  /**
   * onChange stores the form component value in the state
   *
   * @method onChange
   * @param  {object} event the event triggered on the HTML element
   *
   * @return {object} new state
   */
  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }
  /**
   * createGroup sends the form data to the API for form creation
   *
   * @method createGroup
   * @param  {object} event the event triggered on the form
   *
   * @return {object} state
   */
  createGroup(event) {
    event.preventDefault();
    const groupData = {
      groupName: this.state.groupName,
      purpose: this.state.purpose,
      users: this.state.members
    };
    this.props.createGroupAction(groupData, this.props.userId)
    .then(() => {
      this.setState({
        groupName: '',
        purpose: '',
        members: []
      });
    });
  }

  /**
   * chipOnChange description
   * @method onChange
   *
   * @param  {array} members registered members of the app
   *
   * @return {object} state
   */
  chipOnChange(members) {
    this.setState({ members });
  }
  /**
   * clearState returns the state to initial state.
   * @method clear
   *
   * @return {void}
   */
  clearState() {
    this.setState({
      groupName: '',
      purpose: '',
      members: []
    });
  }
  /**
   * render
   *
   * @method render
   *
   * @return {ReactElement} markup
   */
  render() {
    return (
      <div id="creategroup" className="modal">
        <form className="create-group" onSubmit={this.createGroup}>
          <h2 className="center"> Create a Group </h2>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="What will you like to call your Group?"
              required
              value={this.state.groupName}
              onChange={this.onChange}
              name="groupName"
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Purpose (optional)"
              value={this.state.purpose}
              onChange={this.onChange}
              name="purpose"
            />
          </div>
          <div className="form-group">
            <Chips
              value={this.state.members}
              onChange={this.chipOnChange}
              suggestions={JSON.parse(this.props.users)}
              placeholder="Type Username of members to add them to this Group"
            />
          </div>
          <div className="form-group">
            <SubmitButton value={'Create'} />
            <CloseButton action={this.clearState} />
          </div>
        </form>
      </div>
    );
  }
}

CreateGroup.propTypes = {
  createGroupAction: PropTypes.func.isRequired,
  userId: PropTypes.number.isRequired,
  users: PropTypes.string.isRequired,
  getUsersAction: PropTypes.func.isRequired
};
/**
 * mapStateToProps makes store data available to the component
 *
 * @method mapStateToProps
 * @param {object} state redux store
 *
 * @return {object} data needed by the component
 */
const mapStateToProps = (state) => {
  let userId = '1';
  if (state.groupReducer !== undefined) {
    userId = state.authUser.userDetails.id || 0;
  }
  return {
    userId,
    users: JSON.stringify(state.getAllUsersReducer.users)
  };
};

export default connect(mapStateToProps, { getUserGroupsAction,
  getUsersAction })(CreateGroup);
