import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';

import addNewMemberAction from '../actions/addNewMemberAction';
import searchUserAction from '../actions/searchUserAction';
import clearStatusAction from '../actions/clearStatusAction';

/**
 * addNewMembers React component for adding users to a group
 * state description
 *
 * @type {Object}
 */
export class AddMembers extends React.Component {
  /**
   * constructor
   * @method constructor
   *
   * @param {object} props properties of the Component
   */
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      termIsEmpty: true,
      searchTerm: '',
      offset: 0,
      pageCount: '',
      members: []
    };
    this.addMember = this.addMember.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
    this.clearState = this.clearState.bind(this);
  }
  /**
   * onChange gets search term
   * @method onChange
   *
   * @param  {object} event data from the search input
   *
   * @return {object} populate the redux store with data
   */
  onChange(event) {
    if (event.target.value.length !== 0) {
      this.setState({
        termIsEmpty: false,
        searchTerm: event.target.value,
      });
      const offSet = this.state.offset || 0;
      this.props.searchUserAction(event.target.value, offSet,
        this.props.groupId);
    } else {
      this.setState({
        termIsEmpty: false,
        searchTerm: event.target.value,
      });
      this.props.clearStatusAction('searchUser');
    }
  }
  /**
   * handlePageClick paginates search result
   * @method handlePageClick
   *
   * @param {object} data click event for page numbers
   *
   * @return {object} populate the redux store with data
   */
  handlePageClick(data) {
    const selected = data.selected;
    const offset = Math.ceil(selected * 5);
    this.props.searchUserAction(this.state.searchTerm, offset,
      this.props.groupId);
  }
  /**
   * addMember adds a new member to a group
   * @method addMember
   *
   * @param  {number} userId the id of the user to id
   * @param  {object} event the html element datas
   *
   * @return  {void} void
   */
  addMember(userId) {
    const groupId = this.props.groupId;
    this.props.addNewMemberAction(groupId, userId);
    this.setState({
      members: [...this.state.members, userId]
    });
  }
  /**
   * clear returns the state of the component to its default
   *
   * @method clear
   *
   * @return {void}
   */
  clearState() {
    this.setState({
      user: '',
      termIsEmpty: true,
      searchTerm: '',
      offset: 0,
      pageCount: '',
      members: []
    });
    this.props.clearStatusAction('searchUser');
  }
  /**
   * render
   * @method render
   *
   * @return {ReactElement} markup
   */
  render() {
    const searchResult = JSON.parse(this.props.searchResult);
    const members = [];
    let paginate;
    if (JSON.parse(this.props.groups !== undefined)) {
      (JSON.parse(this.props.groups)).forEach((group) => {
        if ((group.id === this.props.groupId) && group.Users !== undefined) {
          (group.Users).map((user) => {
            members.push(user.id);
          });
        }
      });
    }
    if (searchResult.length !== 0) {
      paginate = (
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
      );
    } else {
      paginate = '';
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
            { (members.indexOf(result.id) < 0)}
            <td> { result.username } </td>
            <td> <input
              type="button"
              className="form-control btn custombutton deep-purple lighten-3"
              value={(members.indexOf(result.id) < 0) ? 'Add' : 'A Member'}
              onClick={this.addMember.bind(null, result.id)}
              disabled={!(members.indexOf(result.id) < 0)}
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
          </div>
          <div className="form-group">
            <label htmlFor="search"> Enter your search term </label>
            <input
              type="search"
              value={this.state.searchTerm}
              onChange={this.onChange}
            />
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
                    { paginate }
                  </td>
                  <td>
                    <button
                      type="button"
                      onClick={this.clearState}
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
  pageCount: PropTypes.number.isRequired,
  clearStatusAction: PropTypes.func.isRequired,
  searchResult: PropTypes.string.isRequired,
  groups: PropTypes.string.isRequired
};
/**
 * mapStateToProps makes the data in the redux store available to this component
 * @method mapStateToProps
 *
 * @param  {object} state the entire redux store
 *
 * @return {object} the bit made available for this component
 */
const mapStateToProps = (state) => {
  return {
    groupId: parseInt((state.setUsersReducer.currentGroup), 10),
    users: state.setUsersReducer.users,
    searchResult: JSON.stringify(state.searchUserReducer.searchResult),
    pageCount: state.searchUserReducer.pageCount,
    groups: JSON.stringify(state.groupReducer.groups[0] || [])
  };
};

export default connect(mapStateToProps, { addNewMemberAction,
  searchUserAction,
  clearStatusAction })(AddMembers);
