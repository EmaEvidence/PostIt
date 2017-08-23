import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import addNewMemberAction from '../actions/addNewMemberAction';
import searchUserAction from '../actions/searchUserAction';

class AddMembers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      termIsEmpty: true
    };
    this.addMember = this.addMember.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  onChange(event, offset) {
    if (event.target.value.length !== 0) {
      this.setState({
        termIsEmpty: false
      });
      const offSet = offset || 0;
      this.props.searchUserAction(event.target.value, offSet, this.props.groupId);
    }
  }

  /**
   * [addMember description]
   * @method addMember
   * @param  {[type]}  userId [description]
   * @param  {[type]}  event  [description]
   * @return  {[type]}  event  [description]
   */
  addMember(userId, event) {
    const groupId = this.props.groupId;
    this.props.addNewMemberAction(groupId, userId);
  }
  /**
   * [render ]
   * @method render
   * @return {[type]} []
   */
  render() {
    const searchResult = this.props.searchResult;
    let resultList;
    if (searchResult.length === 0 || this.state.termIsEmpty === true) {
      resultList = (
        <tr>
          <td>
              No Result, Enter a search term or check what you have typed
          </td>
        </tr>
      );
    } else {
      resultList = (searchResult).map(result =>
        (
          <tr key={result.id}>
            <td> { result.username } { result.id } </td>
            <td><input
              type="button"
              className="form-control btn custombutton deep-purple lighten-3"
              value="Add"
              onClick={this.addMember.bind(null, result.id)}
            />
            </td>
          </tr>
      ));
    }
    return (
      <div id="addmembers" className="modal fade reg-form">
        <form className="modal-dialog" onSubmit={this.addMember}>
          <div>
            <h2 className="center"> Add Members </h2>
            <h6 className="center"> { this.props.status }</h6>
          </div>
          <div className="form-group">
            <label htmlFor="search"> Enter your search term </label>
            <input type="search" onKeyUp={this.onChange} />
          </div>
          <div className="result-holder">
            <table className="center add-table">
              { resultList }
            </table>
          </div>
          <div className="form-group">
            <tr>
              <td> Prev </td>
              <td>1, 2, 3, 4, 5</td>
              <td>Next
              </td>
            </tr>
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
  addNewMemberAction: PropTypes.func.isRequired,
  groupId: PropTypes.number.isRequired,
  searchUserAction: PropTypes.func.isRequired
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
    status: state.addNewMemberReducer.status,
    searchResult: state.searchUserReducer.searchResult
  };
}
export default connect(mapStateToProps, { addNewMemberAction, searchUserAction })(AddMembers);
