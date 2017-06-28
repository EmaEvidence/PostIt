import React from 'react';

class LogIn extends React.Component {
  render() {
    return (
      <div id="signin" className="modal fade" role="dialog">
        <form className="modal-dialog">
          <div className="modal-header">
            <h2 >Sign In </h2>
            <button type="button" className="close" data-dismiss="modal" > Close &times;</button>
          </div>
          <div className="form-group">
            <input type="text" className="form-control" placeholder="Username" required />
          </div>
          <div className="form-group">
            <input type="password"className="form-control" placeholder="Password" required />
          </div>
          <div className="form-group">
            <input type="submit" className="form-control btn btn-success" value="Log In" />
          </div>
        </form>
      </div>
    );
  }
}

export default LogIn;
