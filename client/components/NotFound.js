import React from 'react';
import SignUp from './SignUp';
import LogIn from './LogIn';
import { connect } from 'react-redux';

import Input from './Input';

/**
 * [Login Component]
 * @type {Object}
 */
class NotFound extends React.Component {
  /**
   * [sets the state for the login component]
   * @method constructor
   * @param  {[type]}    props [description]
   * @return {[type]}          [description]
   */
  constructor(props) {
    super(props);
    this.state = {
      cpassword: '',
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
      <div id="" className="reg-form row center page-not-found">
        <h1> 404 </h1>
        <h1> Page Not Found </h1>
        <SignUp />
        <LogIn />
      </div>
    );
  }
}

NotFound.propTypes = {
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

export default connect(mapStateToProps)(NotFound);
