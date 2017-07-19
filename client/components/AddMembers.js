import React from 'react';

class AddMembers extends React.Component {
  render() {
    return (
      <div id="addmembers" className="modal fade reg-form">
        <form className="modal-dialog">
          <h2> Add Members </h2>
          <div className="form-group">
            <label> Add members by username </label>
            <div className="chips chips-autocomplete" />
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

export default AddMembers;
