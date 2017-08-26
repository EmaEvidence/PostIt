import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';

import addNewMemberAction from '../actions/addNewMemberAction';
import searchUserAction from '../actions/searchUserAction';
import clearStoreAction from '../actions/clearStoreAction';

/**
 * [state description]
 * @type {Object}
 */
class AddMembers extends React.Component {
  /**
   * [constructor description]
   * @method constructor
   * @param  {[type]}    props [description]
   * @return {[type]}          [description]
   */
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      termIsEmpty: true,
      searchTerm: '',
      offset: 0,
      pageCount: ''
    };
    this.addMember = this.addMember.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
    this.checkIfMember = this.checkIfMember.bind(this);
    this.clear = this.clear.bind(this);
  }
  /**
   * [onChange gets search term]
   * @method onChange
   * @param  {[object]} event [data from the search input]
   * @return {[object]}             [populate the redux store with data]
   */
  onChange(event) {
    if (event.target.value.length !== 0) {
      this.setState({
        termIsEmpty: false,
        searchTerm: event.target.value,
      });
      const offSet = this.state.offset || 0;
      this.props.searchUserAction(event.target.value, offSet, this.props.groupId);

    }
  }
  /**
   * [handlePageClick paginates search result]
   * @method handlePageClick
   * @param  {[object]}        data [click event for page numbers]
   * @return {[object]}             [populate the redux store with data]
   */
  handlePageClick(data) {
    const selected = data.selected;
    const offset = Math.ceil(selected * 5);
    this.props.searchUserAction(this.state.searchTerm, offset, this.props.groupId);
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

  checkIfMember(userId, userIds) {
    if (userIds.indexOf(userId) < 0) {
      return true;
    }
  }
  clear() {
    this.setState({
      user: '',
      termIsEmpty: true,
      searchTerm: '',
      offset: 0,
      pageCount: ''
    });
    this.props.clearStoreAction('addMember');
    this.props.clearStoreAction('searchUser');
  }
  /**
   * [render ]
   * @method render
   * @return {[type]} []
   */
  render() {
    const searchResult = this.props.searchResult;
    const userIds = [];
    if (this.props.groups !== undefined) {
      (this.props.groups).forEach((group) => {
        if (group.id === this.props.groupId) {
          (group.Users).map((user) => {
            userIds.push(user.id);
          });
        }
      });
    }
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
            { this.checkIfMember(result.id, userIds)}
            <td> { result.username } </td>
            <td> <input
              type="button"
              className="form-control btn custombutton deep-purple lighten-3"
              value={this.checkIfMember(result.id, userIds) ? 'Add' : 'A Member'}
              onClick={this.addMember.bind(null, result.id)}
              disabled={!this.checkIfMember(result.id, userIds)}
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
            <input type="search" onChange={this.onChange} />
          </div>
          <div className="result-holder">
            <table className="center add-table">
              <tbody>
                { resultList }
              </tbody>
            </table>
          </div>
          <div className="form-group">
            <table>
              <tbody>
                <tr>
                  <td>
                    <ReactPaginate
                      previousLabel={'previous'}
                      nextLabel={'next'}
                      breakLabel={<a href>...</a>}
                      breakClassName={'break-me'}
                      pageCount={this.props.pageCount}
                      marginPagesDisplayed={2}
                      pageRangeDisplayed={5}
                      onPageChange={this.handlePageClick}
                      containerClassName={'pagination'}
                      subContainerClassName={'pages pagination'}
                      activeClassName={'active'}
                    />
                  </td>
                  <td>
                    <button
                      type="button"
                      onClick={this.clear}
                      className="modal-close btn right deep-purple lighten-4 custombutton"
                    >Cancel</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </form>
      </div>
    );
  }
}

AddMembers.propTypes = {
  addNewMemberAction: PropTypes.func.isRequired,
  groupId: PropTypes.number.isRequired,
  searchUserAction: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
  pageCount: PropTypes.string.isRequired,
  clearStoreAction: PropTypes.func.isRequired
};
/**
 * [mapStateToProps makes the data in the redux store available to this component]
 * @method mapStateToProps
 * @param  {[object]}        state [the entire redux store]
 * @return {[object]}              [the bit made available for this component]
 */
function mapStateToProps(state) {
  return {
    groupId: parseInt((state.setUsersReducer.current_group), 10),
    users: state.setUsersReducer.users,
    status: state.addNewMemberReducer.status,
    searchResult: state.searchUserReducer.searchResult,
    pageCount: state.searchUserReducer.pageCount,
    groups: state.getUserGroupsReducer.groups[0]
  };
}
export default connect(mapStateToProps, { addNewMemberAction, searchUserAction, clearStoreAction })(AddMembers);
