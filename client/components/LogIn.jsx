import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Input from './Input';
import GoogleLogin from './GoogleLogin';
import googleAuthAction from '../actions/googleAuthAction';

/**
 * Login Component
 */
class LogIn extends React.Component {
  /**
   * [ets the state for the login component
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
   * render displays the html
   * @method render
   *
   * @return {ReactElement} markup
   */
  render() {
    const googleAuth = this.props.googleAuthAction;
    return (
      <div id="signin" className="modal fade reg-form" role="dialog">
        <form onSubmit={this.onSubmit} className="modal-dialog">
          <div className="modal-header">
            <h2 className="form-header" >Sign In </h2>
            <GoogleLogin type={'Sign In '} googleAction={googleAuth} />
            <p className="center">{this.props.status ? this.props.status : this.state.status}</p>
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
            <Input
              value={'Log In'}
              type={'submit'}
              class={'form-control btn deep-purple lighten-3 custombutton'}
            />
            <button
              type="reset"
              className="right close form-header"
              data-dismiss="modal"
            >Close</button>
          </div>
        </form>
        <div className="form-group forget-password-wrapper">
          <b className="forget-password">
          Forgot Password click
          <a href="#forgetpwd" className="" data-dismiss="modal"> here </a> </b>
        </div>
      </div>
    );
  }
}

LogIn.propTypes = {
  userSignin: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
  googleAuthAction: PropTypes.func.isRequired,
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
    status: state.authUser.authMessage.data
  };
};

export default connect(mapStateToProps, { googleAuthAction })(LogIn);
