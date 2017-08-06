import React from 'react';
import { connect } from 'react-redux';

class AddMembers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.addMember = this.addMember.bind(this);
  }
  addMember(e){
    e.preventDefault();
    alert(this.props.groupId);
    console.log(this.refs.member.value);
  }
  render() {
    return (
      <div id="addmembers" className="modal fade reg-form">
        <form className="modal-dialog" onSubmit={this.addMember}>
          <h2> Add Members </h2>
          <div className="form-group">
            <label> Add members by username </label>
            <div className="chips chips-autocompleteAdd" />
            <input
              type="hidden"
              id="member"
              value=""
              name="member"
              ref="member"
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
            {this.props.groupId}
          </div>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    groupId: state.setCurrentGroupReducer.current_group
  };
}
export default connect(mapStateToProps)(AddMembers);
