import React from 'react';

class ForgetPassword extends React.Component {
  render() {
    return (
      <div id="forgetpwd" className="modal fade reg-form">
        <form className="modal-dialog">
          <div className="modal-header">
            <h2 className="form-header" > Forgot Password </h2>
            <h5> Enter your email address to recieve a link to reset your password </h5>
          </div>
          <div className="form-group">
            <input type="email" className="form-control" placeholder="Email" required />
          </div>
          <div className="form-group">
            <input
              type="submit"
              className="form-control btn deep-purple lighten-3 custombutton"
              value="Submit"
            />
            <button
              type="button"
              className="right modal-close form-header btn deep-purple lighten-4 custombutton"
              data-dismiss="modal"
            >Close</button>
          </div>
        </form>
      </div>
    );
  }
}

export default ForgetPassword;
