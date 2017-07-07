import React from 'react';
import { connect } from 'react-redux';
import userSignupRequest from '../actions/SignUpAction';
import SignUp from './SignUp';
import LogIn from './LogIn';
import Slider from './Slider';

class Index extends React.Component {
  render() {
    const { userSignupRequest } = this.props;
    return (
      <div>
        <Slider />
        <div className="container">
          <div className="how">
            <h4> How it works </h4>
          </div>
          <div className="row">
            <div className="col-md-3 card how-card">
              <h3 className="card-content">Register as a User</h3>
            </div>
            <div className="col-md-3 card how-card">
              <h3 className="card-content">Create a Group</h3>
            </div>
            <div className="col-md-3 card how-card">
              <h3 className="card-content">Add Members to the Group</h3>
            </div>
            <div className="col-md-3 card how-card">
              <h3 className="card-content">Send Informations.</h3>
            </div>
          </div>
          <div className="how">
            <h4> Collaborate on the move </h4>
          </div>
        </div>
        <SignUp userSignupRequest={userSignupRequest} />
        <LogIn />
      </div>
    );
  }
}

Index.propTypes = {
  userSignupRequest: React.PropTypes.func.isRequired
};

export default connect(null, { userSignupRequest })(Index);
