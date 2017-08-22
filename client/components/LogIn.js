import React from 'react';
import { connect } from 'react-redux';

import Input from './Input';

/**
 * [Login Component]
 * @type {Object}
 */
class LogIn extends React.Component {
  /**
   * [sets the state for the login component]
   * @method constructor
   * @param  {[type]}    props [description]
   * @return {[type]}          [description]
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
    this.props.userSignin(this.state);
    this.setState({
      status: 'Processing'
    });
  }
  /**
   * [displays the form to login]
   * @method render
   * @return {[jsx]} [description]
   */
  render() {
    return (
      <div id="signin" className="modal fade reg-form" role="dialog">
        <form onSubmit={this.onSubmit} className="modal-dialog">
          <div className="modal-header">
            <h2 className="form-header" >Sign In </h2>
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
  userSignin: React.PropTypes.func.isRequired,
  status: React.PropTypes.string.isRequired
};

/**
 * [mapStateToProps makes the data in the store available]
 * @method mapStateToProps
 * @param  {[object]}        state [the store for all app data]
 * @return {[object]}              [login State]
 */
function mapStateToProps(state) {
  return {
    status: state.authUser.auth_message.data
  };
}

export default connect(mapStateToProps)(LogIn);
