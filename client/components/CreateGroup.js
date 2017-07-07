import React from 'react';

class CreateGroup extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-1" />
          <div className="col-sm-10">
            <form>
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
                <input type="submit" className="form-control btn btn-success teal" value="Create" />
              </div>
            </form>
          </div>
          <div className="col-sm-1" />
        </div>
        <h4> Add Members </h4>
        <div className="row">
          <div className="col-md-1" />
          <div className="col-md-10 row">
            <div className="col-md-4">
              <div>
                <label> Emmanuel Alabi </label>
                <input type="button" className="btn btn-success teal" value="Add" />
              </div><br />
              <div>
                <label> Emmanuel Alab </label>
                <input type="button" className="btn btn-success teal" value="Add" />
              </div><br />
              <div>
                <label> Emmanuel Alabi </label>
                <input type="button" className="btn btn-success teal" value="Add" />
              </div><br />
            </div>
            <div className="col-md-4">
              <div>
                <label> Emmanuel Alabi </label>
                <input type="button" className="btn btn-success" value="Add" />
              </div><br />
              <div>
                <label> Emmanuel Alabi </label>
                <input type="button" className="btn btn-success" value="Add" />
              </div><br />
              <div>
                <label> Emmanuel Alabi </label>
                <input type="button" className="btn btn-success" value="Add" />
              </div><br />
            </div>
            <div className="col-md-4">
              <div>
                <label> Emmanuel Alabi </label>
                <input type="button" className="btn btn-success" value="Add" />
              </div><br />
              <div>
                <label> Emmanuel Alabi </label>
                <input type="button" className="btn btn-success" value="Add" />
              </div><br />
              <div>
                <label> Emmanuel Alabi </label>
                <input type="button" className="btn btn-success" value="Add" />
              </div><br />
            </div>
          </div>
          <div className="col-md-1" />
        </div>
      </div>
    );
  }
}

export default CreateGroup;
