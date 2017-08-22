import React from 'react';
import { connect } from 'react-redux';

/**
 * [state creates a  sign up form]
 * @type {Object}
 */
class SignUp extends React.Component {
  /**
   * [constructor]
   * @method constructor
   * @param  {[object]}    props [data passed to this element]
   * @return {[html]}          [sign up component]
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
   * @param  {[object]} event [the current html element]
   * @return {[object]}   [data from the form]
   */
  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  /**
   * [onSubmit sends the data supplied through the form to the API]
   * @method onSubmit
   * @param  {[object]} event [the form event]
   * @return {[]}   []
   */
  onSubmit(event) {
    event.preventDefault();
    this.props.userSignup(this.state);
  }
  /**
   * [checkPassword confirms if the password and confirm password supplied is matches]
   * @method checkPassword
   * @return {[boolean]}        [test result]
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
   * [render ]
   * @method render
   * @return {[type]} [description]
   */
  render() {
    return (
      <div id="signup" className="modal fade reg-form" role="dialog">
        <form className="modal-dialog signupform" onSubmit={this.onSubmit}>
          <div className="modal-header mo">
            <h2 className="form-header center" >Sign Up </h2>
            <a href="" className="sign-with-google center">Sign Up with Google+ </a>
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
  message: React.PropTypes.string.isRequired
};

/**
 * [mapStateToProps gets values from the store and makes it available for the component]
 * @method mapStateToProps
 * @param  {[object]}        state [the entire App data]
 * @return {[object]}              [the part of App data needed by this component]
 */
function mapStateToProps(state) {
  return {
    message: state.authUser.auth_message.data
  };
}
export default connect(mapStateToProps)(SignUp);
