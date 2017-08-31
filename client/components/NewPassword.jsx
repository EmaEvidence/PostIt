import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Input from './Input';
import SignUp from './SignUp';
import LogIn from './LogIn';
import resetPasswordAction from '../actions/resetPasswordAction';

/**
 * [NewPassword Component]
 */
class NewPassword extends React.Component {
  /**
   * [sets the state for the login component]
   * @method constructor
   * @param  {object}    props []
   * @return {void}          []
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
   * [stores form values in the components state whenever it changes]
   * @method onChange
   * @param  {[object]} event [description]
   * @return {[object]}   [description]
   */
  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  /**
   * [sends the form values to the server]
   * @method onSubmit
   * @param  {[object]} event [description]
   * @return {[objec]}   [description]
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
      this.props.resetPasswordAction(this.state.password, (this.props.location).search);
      this.setState({
        confirmPassword: '',
        password: ''
      });
    }
  }
  /**
   * [displays the form to login]
   * @method render
   * @return {[jsx]} [description]
   */
  render() {
    return (
      <div id="" className="reg-form row">
        <form onSubmit={this.onSubmit} className="newpassword col s4 offset-s4 valign">
          <div className="modal-header">
            <h3 className="form-header" > Reset Password </h3>
            <p className="center"> Please use the Form Below to Reset Your Password </p>
            <p className="center">{this.props.status ? this.props.status : this.state.status}</p>
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
            value={this.state.confirmPasswordpassword}
            required
            action={this.onChange}
            type={'password'}
            name={'confirmPassword'}
            class={'form-control'}
          />
          <div className="form-group">
            <Input
              value={'Reset Password'}
              type={'submit'}
              class={'form-control btn deep-purple lighten-3 custombutton'}
            />
          </div>
        </form>
        <SignUp />
        <LogIn />
      </div>
    );
  }
}

NewPassword.propTypes = {
  status: PropTypes.string.isRequired,
  resetPasswordAction: PropTypes.func.isRequired,
};

/**
 * [mapStateToProps makes the store data available]
 * @method mapStateToProps
 * @param  {object}        state [the store date]
 * @return {object}              [ the data needed by the component]
 */
const mapStateToProps = (state) => {
  return {
    status: state.resetPasswordReducer.status
  };
};

export default connect(mapStateToProps, { resetPasswordAction })(NewPassword);
