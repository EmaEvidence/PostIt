import React from 'react';

class CreateGroup extends React.Component {
  render() {
    return (
      <div id="creategroup" className="modal fade reg-form" role="dialog">
        <form className="modal-dialog">
          <h2> Create a Group </h2>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="What will you like to call your Group?"
              required
            />
          </div>
          <div className="form-group">
            <input type="text" className="form-control" placeholder="Purpose (optional)" required />
          </div>
          <div className="form-group">
            <label> Add members by username </label>
            <div className="chips chips-autocomplete" />
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

export default CreateGroup;
