import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Input from './Input';
import GoogleLogin from './GoogleLogin';
import googleAuthAction from '../actions/googleAuthAction';
import SubmitButton from './SubmitButton';
import CloseButton from './CloseButton';

/**
 * Login Component
 */
export class LogIn extends React.Component {
  /**
   * sets the state for the login component
   * @method constructor
   *
   * @param  {object}  props description
   */
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      status: ''
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.clearState = this.clearState.bind(this);
  }

  /**
   * stores form values in the components state whenever it changes
   * @method onChange
   *
   * @param  {SyntheticEvent} event
   *
   * @return {void}
   */
  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  /**
   * sends the form values to the server
   * @method onSubmit
   *
   * @param  {SyntheticEvent} event
   *
   * @return {void}
   */
  onSubmit(event) {
    event.preventDefault();
    this.props.userSignin(this.state);
    this.setState({
      status: 'Processing'
    });
  }
  /**
   * clearState returns state to its inital value
   * @method clearState
   *
   * @return {object} state
   */
  clearState() {
    this.setState({
      username: '',
      password: '',
      status: ''
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
      <div id="signin" className="modal">
        <form onSubmit={this.onSubmit} className="signupform">
          <div className="">
            <h2 className="form-header center">Sign In</h2>
            <p className="center">
              <GoogleLogin type={'Sign In '} googleAction={googleAuth} />
            </p>
          </div>
          <Input
            placeholder={'Username'}
            value={this.state.username}
            required
            action={this.onChange}
            type={'text'}
            name={'username'}
            class={'form-control'}
          />
          <Input
            placeholder={'Password'}
            value={this.state.password}
            required
            action={this.onChange}
            type={'password'}
            name={'password'}
            class={'form-control'}
          />
          <div className="form-group">
            <SubmitButton value={'Log In'} />
            <CloseButton action={this.clearState} />
          </div>
        </form>
        <div className="form-group forget-password-wrapper">
          <b className="forget-password">
          Forgot Password click
          <a href="#forgetpwd" className="modal-trigger modal-close"> here </a> </b>
        </div>
      </div>
    );
  }
}

LogIn.propTypes = {
  userSignin: PropTypes.func.isRequired,
  googleAuthAction: PropTypes.func.isRequired,
};


export default connect(null, { googleAuthAction })(LogIn);
