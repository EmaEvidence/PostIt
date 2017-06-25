import React from 'react';

class SignUp extends React.Component {
  render() {
    return (
      <div id="signup" className="modal fade" role="dialog">
        <form className="modal-dialog">
          <div className="modal-header">
            <h2 >Sign Up </h2>
            <button type="button" className="close" data-dismiss="modal" >&times;</button>
          </div>
          <div className="form-group">
            <input type="text" className="form-control" placeholder="FirstName LastName" required />
          </div>
          <div className="form-group">
            <input type="text" className="form-control" placeholder="Username" required />
          </div>
          <div className="form-group">
            <input type="email" className="form-control" placeholder="Email" required />
          </div>
          <div className="form-group">
            <input type="password" className="form-control" placeholder="Password" required id="password" />
          </div>
          <div className="form-group">
            <span id="showvalidity" />
            <input type="password" className="form-control" placeholder="Confirm Password" onKeyUp="validate(this.value)" required />
          </div>
          <div className="form-group">
            <input type="submit" className="form-control btn btn-success" value="Submit" />
          </div>
        </form>
      </div>
    );
  }
}

export default SignUp;
