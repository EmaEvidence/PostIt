import React from 'react';

class LogIn extends React.Component {
  render() {
    return (
      <div id="signin" className="modal fade" role="dialog">
        <form className="modal-dialog">
          <div className="modal-header header-wrapper">
            <b className="form-header">Sign In </b>
            <b className="close" data-dismiss="modal" > Close</b>
          </div>
          <div className="form-group">
            <span className="" />
          </div>
          <div className="form-group">
            <input type="text" className="form-control" placeholder="Username" required />
          </div>
          <div className="form-group">
            <input type="password"className="form-control" placeholder="Password" required />
          </div>
          <div className="form-group">
            <input type="submit" className="form-control btn btn-success teal" value="Log In" />
          </div>
        </form>
        <div className="form-group forget-password-wrapper">
          <b className="forget-password"> Forgot Password click <a href=""> here </a> </b>
        </div>
      </div>
    );
  }
}

export default LogIn;
