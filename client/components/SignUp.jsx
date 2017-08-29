import React from 'react';
import { connect } from 'react-redux';

import GoogleLogin from './GoogleLogin';
import googleAuthAction from '../actions/googleAuthAction';

/**
 * [SignUp creates a  sign up form]
 */
export class SignUp extends React.Component {
  /**
   * [constructor]
   * @method constructor
   * @param  {[object]}    props [data passed to this element]
   * @return {void}          []
   */
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      username: '',
      email: '',
      password: '',
      cpassword: '',
      phone: '',
      status: '',
      pwdmatch: ''
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.checkPassword = this.checkPassword.bind(this);
  }
  /**
   * [onChange stores the data from the form component]
   * @method onChange
   * @param  {object} event [the current html element]
   * @return {object}   [data from the form]
   */
  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  /**
   * [onSubmit sends the data supplied through the form to the API]
   * @method onSubmit
   * @param  {object} event [the form event]
   * @return {void}   []
   */
  onSubmit(event) {
    event.preventDefault();
    this.props.userSignup(this.state);
  }
  /**
   * [checkPassword confirms if the password and confirm password supplied is matches]
   * @method checkPassword
   * @return {boolean}        [test result]
   */
  checkPassword() {
    if (this.state.password === this.state.cpassword) {
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
   * [render displays the html ]
   * @method render
   * @return {ReactElement} [markup]
   */
  render() {
    const googleAuth = this.props.googleAuthAction;
    return (
      <div id="signup" className="modal fade reg-form" role="dialog">
        <form className="modal-dialog signupform" onSubmit={this.onSubmit}>
          <div className="modal-header mo">
            <h2 className="form-header center" >Sign Up </h2>
            <GoogleLogin type={'SignUp'} googleAction={googleAuth} />
            <p className="alert alert-danger center">{this.props.message}</p>
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
              value={this.state.cpassword}
              placeholder="Confirm Password"
              name="cpassword"
              onKeyUp={this.checkPassword}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="submit"
              className="form-control btn deep-purple lighten-3 custombutton"
              value="Submit"
              disabled
              ref="submit"
            />
            <button
              type="reset"
              className="right close form-header"
              data-dismiss="modal"
            >Close</button>
          </div>
        </form>
      </div>
    );
  }
}

SignUp.propTypes = {
  userSignup: React.PropTypes.func.isRequired,
  googleAuthAction: React.PropTypes.func.isRequired,
  message: React.PropTypes.string.isRequired
};

/**
 * [mapStateToProps makes the store data available]
 * @method mapStateToProps
 * @param  {object}        state [the store date]
 * @return {object}              [ the data needed by the component]
 */
const mapStateToProps = (state) => {
  let message;
  if (state.authUser.auth_message.data === undefined) {
    message = '';
  } else {
    message = state.authUser.auth_message.data;
  }
  return {
    message
  };
};
export default connect(mapStateToProps, { googleAuthAction })(SignUp);
