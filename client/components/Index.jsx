import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import userSignUpAction from '../actions/userSignUpAction';
import userSignInAction from '../actions/userSignInAction';
import SignUp from './SignUp';
import LogIn from './LogIn';
import ForgotPassword from './ForgotPassword';
import authUser from '../actions/authAction';

/**
 * Index the landing page for the App
 * @method Index
 *
 * @param  {object} props store data passed to the component
 *
 * @return {ReactElement} markup
 */
const Index = (props) => {
  const userSignup = props.userSignUpAction;
  const Login = props.userSignInAction;
  const authUserAction = props.authUser;
  let button;
  if (props.status) {
    button = (
      <button
        className="btn deep-purple lighten-3 homebtn"
      > <a href="/Messageboard">
      Messageboard </a></button>
    );
  } else {
    button = (
      <button
        className="btn deep-purple lighten-3 homebtn"
      > <a href="#signin" className="modal-trigger">
          Login
        </a>
      </button>
      );
  }
  return (
    <div>
      <section className="indeximage valign-wrapper center-align">
        <p className="center-align">
          <b className="imgdesc">
            Rethinking and Reinventing Mass Communication</b><br />
            PostIt is a simple application that allows friends
            and colleagues create groupsfor notifications.
            This way one person can post notifications to everyone by sending
            a message once. The application allows people create accounts,
            create groups and add registered users to the groups,
            and then send messages out to these groups whenever they want.<br />
          { button }
        </p>
      </section>
      <section id="about">
        <div className="about">
          <h1> How It works </h1>
        </div>
        <div className="col s12">
          <div className="row">
            <div className="col s4 about">
              <h1><i className="large material-icons">perm_identity</i></h1>
              <h3> Register </h3>
            </div>
            <div className="col s4 about">
              <h1><i className="large material-icons">contacts</i></h1>
              <h3> Create Groups </h3>
            </div>
            <div className="col s4 about">
              <h1><i className="large material-icons">present_to_all</i></h1>
              <h3> Broadcast Message </h3>
            </div>
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
                Emmanuel has a week experience in UI and UX during which he has
                worked for many organizations like Andela, Facebook and Apple.
              </p>
          </div>
        </div>
      </section>
      <SignUp userSignup={userSignup} authUser={authUserAction} />
      <LogIn userSignin={Login} authUser={authUserAction} />
      <ForgotPassword />
    </div>
  );
};

Index.propTypes = {
  userSignUpAction: PropTypes.func.isRequired,
  userSignInAction: PropTypes.func.isRequired,
  authUser: PropTypes.func.isRequired,
  status: PropTypes.bool.isRequired
};

/**
 * mapStateToProps makes the store data available
 * @method mapStateToProps
 *
 * @param  {object} state the store date
 *
 * @return {object} the data needed by the component
 */
const mapStateToProps = (state) => {
  return {
    status: state.authUser.loggedIn
  };
};


export default connect(mapStateToProps, { userSignUpAction,
  userSignInAction,
  authUser })(Index);
