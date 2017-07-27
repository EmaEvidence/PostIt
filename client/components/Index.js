import React from 'react';
import { connect } from 'react-redux';
import userSignupRequest from '../actions/SignUpAction';
import SignUp from './SignUp';
import LogIn from './LogIn';
import CreateGroup from './CreateGroup';
import Notifications from './Notification';
import ForgetPassword from './ForgetPassword';

class Index extends React.Component {
  render() {
    const userSignup = this.props.userSignupRequest;
    return (
      <div>
        <section className="indeximage valign-wrapper center-align">
          <p className="center-align">
            <b className="imgdesc">Rethinking and Reinventing Mass Communication</b><br />
            PostIt is a simple application that allows friends and colleagues create groups
            for notifications.
            This way one person can post notifications to everyone by sending a message once.
            The application allows people create accounts,
            create groups and add registered users to the groups,
            and then send messages out to these groups whenever they want.<br />
            <button
              className="btn deep-purple lighten-3"
              data-toggle="modal"
              data-target="#signin"
            >Create Group</button>
          </p>
        </section>
        <section id="about">
          <div className="about">
            <h1> How It works </h1>
          </div>
          <div className="container row howitworks">
            <div className="col s4 about">
              <h1><i className="large material-icons">perm_identity</i></h1>
              <h3> Register </h3>
              Hi we are here
            </div>
            <div className="col s4 about">
              <h1><i className="large material-icons">contacts</i></h1>
              <h3> Create Groups </h3>
              Hi we are here
            </div>
            <div className="col s4 about">
              <h1><i className="large material-icons">present_to_all</i></h1>
              <h3> Broadcast Message </h3>
            Hi we are here
          </div>
          </div>
        </section>
        <section className="container">
          <div id="team">
            <h1>Meet the Designer</h1>
            <div>
              <h1><i className="large material-icons">perm_identity</i></h1>
              <h4> Ema Evidence </h4>
              <p>
                Emmanuel has a week experience in UI and UX during which he has worked
                for many organizations
                like Andela, Facebook and Apple.
              </p>
            </div>
          </div>
        </section>
        <SignUp userSignup={userSignup} />
        <LogIn />
        <CreateGroup />
        <Notifications />
        <ForgetPassword />
      </div>
    );
  }
}

Index.propTypes = {
  userSignupRequest: React.PropTypes.func.isRequired
};

export default connect(null, { userSignupRequest })(Index);
