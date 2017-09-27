import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Input from './Input';
import resetPasswordAction from '../actions/resetPasswordAction';
import SubmitButton from './SubmitButton';

/**
 * NewPassword Component
 */
export class NewPassword extends React.Component {
  /**
   * sets the state for the login component
   * @method constructor
   *
   * @param  {object} props
   *
   * @return {void}
   */
  constructor(props) {
    super(props);
    this.state = {
      confirmPassword: '',
      password: '',
      status: ''
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  /**
   * stores form values in the components state whenever it changes
   * @method onChange
   *
   * @param  {SyntheticEvent} event
   *
   * @return {object} state
   */
  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
      status: ''
    });
  }
  /**
   * sends the form values to the server
   * @method onSubmit
   *
   * @param  {object} event
   *
   * @return {object} state
   */
  onSubmit(event) {
    event.preventDefault();
    if (this.state.password !== this.state.confirmPassword) {
      this.setState({
        status: 'Password Mismatch'
      });
    } else {
      this.setState({
        status: 'Processing'
      });
      this.props.resetPasswordAction(this.state.password, this.props.location.search.split('=')[1]);
      this.setState({
        confirmPassword: '',
        password: ''
      });
    }
  }
  /**
   * displays the form to login
   * @method render
   *
   * @return {jsx} description
   */
  render() {
    return (
      <div id="" className="reg-form row">
        <form onSubmit={this.onSubmit} className="newpassword col s4 offset-s4 valign">
          <div className="modal-header">
            <h3 className="form-header" > Reset Password </h3>
            <p className="center"> Please use the Form Below to Reset Your Password </p>
          </div>
          <Input
            placeholder={'New Password'}
            value={this.state.password}
            required
            action={this.onChange}
            type={'password'}
            name={'password'}
            class={'form-control'}
          />
          <Input
            placeholder={'Confirm New Password'}
            value={this.state.confirmPassword}
            required
            action={this.onChange}
            type={'password'}
            name={'confirmPassword'}
            class={'form-control'}
          />
          <div className="form-group">
            <SubmitButton value={'Reset Password'} />
            <a href="/" className="right">
              <SubmitButton value={'Return Home'} type="button" />
            </a>
          </div>
        </form>
      </div>
    );
  }
}

NewPassword.propTypes = {
  resetPasswordAction: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired
};

export default connect(null, { resetPasswordAction })(NewPassword);
