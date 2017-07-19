import React from 'react';

class LogIn extends React.Component {
  render() {
    return (
      <div id="signin" className="modal fade reg-form" role="dialog">
        <form className="modal-dialog">
          <div className="modal-header">
            <h2 className="form-header" >Sign In </h2>
            <button
              type="button"
              className="close form-header"
              data-dismiss="modal"
            >&times;</button>
          </div>
          <div className="form-group">
            <input type="text" className="form-control" placeholder="Username" required />
          </div>
          <div className="form-group">
            <input type="password" className="form-control" placeholder="Password" required />
          </div>
          <div className="form-group">
            <input
              type="submit"
              className="form-control btn deep-purple lighten-3 custombutton"
              value="Log In"
            />
          </div>
        </form>
        <div className="form-group forget-password-wrapper">
          <b className="forget-password">
          Forgot Password click <a href="#forgetpwd" className="" data-dismiss="modal"> here </a> </b>
        </div>
      </div>
    );
  }
}

export default LogIn;
