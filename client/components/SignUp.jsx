import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import GoogleAuth from './GoogleAuth';
import googleAuthAction from '../actions/googleAuthAction';
import CloseButton from './CloseButton';

/**
 * SignUp creates a  sign up form
 */
export class SignUp extends React.Component {
  /**
   * constructor
   * @method constructor
   *
   * @param  {object} props data passed to this element
   *
   * @return {void}
   */
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      phone: '',
      status: '',
      pwdmatch: ''
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.checkPassword = this.checkPassword.bind(this);
    this.clearState = this.clearState.bind(this);
  }

  /**
   * onChange stores the data from the form component
   * @method onChange
   *
   * @param  {object} event the current html element
   *
   * @return {object} data from the form
   */
  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  /**
   * onSubmit sends the data supplied through the form to the API
   * @method onSubmit
   *
   * @param  {object} event the form event
   *
   * @return {void}
   */
  onSubmit(event) {
    event.preventDefault();
    this.props.userSignup(this.state);
  }
  
  /**
   * checkPassword confirms if the password and confirm password matches
   *
   * @method checkPassword
   *
   * @return {boolean} test result
   */
  checkPassword() {
    if (this.state.password === this.state.confirmPassword) {
      this.setState({
        pwdmatch: 'password matches',
      });
      this.refs.submit.disabled = false;
    } else {
      this.setState({
        pwdmatch: 'password does not match',
      });
      this.refs.submit.disabled = true;
    }
  }

  /**
   * clearState returns state to its inital value
   * @method clearState
   *
   * @return {object} state
   */
  clearState() {
    this.setState({
      name: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      phone: '',
      status: '',
      pwdmatch: ''
    });
  }

  /**
   * render displays the html
   * @method render
   *
   * @return {ReactElement} markup
   */
  render() {
    const googleAuth = this.props.googleAuthAction;
    return (
      <div id="signup" className="modal">
        <form className="signupform" onSubmit={this.onSubmit}>
          <div className="">
            <h2 className="form-header center" >Sign Up </h2>
            <p className="center">
              <GoogleAuth type={'Sign Up'} googleAction={googleAuth} />
            </p>
          </div>
          <div className="form-group">
            <input
              type="text"
              onChange={this.onChange}
              className="customform form-control"
              value={this.state.name}
              name="name"
              placeholder="FirstName LastName"
              required
              id="name"
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              onChange={this.onChange}
              className="form-control"
              value={this.state.username}
              placeholder="Username"
              name="username"
              required
              id="username"
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              onChange={this.onChange}
              className="form-control validate"
              value={this.state.email}
              placeholder="Email"
              name="email"
              required
              id="email"
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              onChange={this.onChange}
              className="form-control validate"
              value={this.state.phone}
              placeholder="Phone Number"
              name="phone"
              required
              id="phone"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              onChange={this.onChange}
              className="form-control"
              value={this.state.password}
              placeholder="Password"
              required
              name="password"
              id="password"
            />
          </div>
          <div className="form-group">
            <span id="showvalidity" className="alert">
              {this.state.pwdmatch}
            </span>
            <input
              type="password"
              onChange={this.onChange}
              className="form-control"
              value={this.state.confirmPassword}
              placeholder="Confirm Password"
              name="confirmPassword"
              onKeyUp={this.checkPassword}
              required
              id="confirmPassword"
            />
          </div>
          <div className="form-group">
            <input
              type="submit"
              className="form-control btn deep-purple lighten-3 custombutton left"
              value="Submit"
              disabled
              ref="submit"
              id="submit"
            />
            <CloseButton action={this.clearState} />
          </div>
        </form>
      </div>
    );
  }
}

SignUp.propTypes = {
  userSignup: PropTypes.func.isRequired,
  googleAuthAction: PropTypes.func.isRequired
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
export default connect(mapStateToProps, { googleAuthAction })(SignUp);
