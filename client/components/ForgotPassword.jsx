import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import passwordResetMailAction from '../actions/passwordResetMailAction';
import Input from './Input';
import SubmitButton from './SubmitButton';
import CloseButton from './CloseButton';


/**
 * ForgetPassword displays a form to request for new password
 */
export class ForgotPassword extends React.Component {
  /**
   * constructor
   * @method constructor
   *
   * @param  {object} props properties of the Component
   *
   * @return {void}
   */
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      status: ''
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.clearState = this.clearState.bind(this);
  }
  /**
   * onChange populates the state with data typed into the input
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
   * onSubmit submits the form
   * @method onSubmit
   *
   * @param  {SyntheticEvent} event
   *
   * @return {void}
   */
  onSubmit(event) {
    event.preventDefault();
    this.setState({
      status: 'Processing'
    });
    this.props.passwordResetMailAction(this.state);
  }

  /**
   * clearState returns state to its inital value
   * @method clearState
   *
   * @return {object} state
   */
  clearState() {
    this.setState({
      email: '',
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
    return (
      <div id="forgetpwd" className="modal fade reg-form forgot-password">
        <form className="modal-dialog" onSubmit={this.onSubmit}>
          <div className="modal-header">
            <h2 className="form-header" > Forgot Password </h2>
            <span className="center">
              {this.props.response ? this.props.response : this.state.status}</span>
            <h5> Enter your email address to recieve a link to reset your password </h5>
          </div>
          <Input
            placeholder={'Email'}
            value={this.state.email}
            required
            action={this.onChange}
            type={'email'}
            name={'email'}
            class={'form-control'}
          />
          <div className="form-group">
            <SubmitButton value={'Submit'} />
            <CloseButton action={this.clearState} />
          </div>
        </form>
      </div>
    );
  }
}

ForgotPassword.propTypes = {
  passwordResetMailAction: PropTypes.func.isRequired,
  response: PropTypes.string.isRequired
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
    response: state.resetPasswordReducer.status
  };
};

export default connect(mapStateToProps, { passwordResetMailAction })(ForgotPassword);
