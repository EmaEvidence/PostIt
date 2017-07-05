import React from 'react';
import { connect } from 'react-redux';
import userSignupRequest from '../actions/SignUpAction';
import SignUp from './SignUp';
import LogIn from './LogIn';
import img from './img/img.jpg';

class Index extends React.Component {
  render() {
    const { userSignupRequest } = this.props;
    return (
      <div>
        <div className="container">
          <img src={img} className="responsive-img" alt="Here" />
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
