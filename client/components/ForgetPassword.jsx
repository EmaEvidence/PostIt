import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import passwordResetMailAction from '../actions/passwordResetMailAction';

/**
 * [ForgetPassword displays a form to request for new password]
 */
class ForgetPassword extends React.Component {
  /**
   * [constructor description]
   * @method constructor
   * @param  {object}    props [properties of the Component]
   * @return {void}          []
   */
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      status: ''
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  /**
   * [onChange populates the state with data typed into the input]
   * @method onChange
   * @param  {SyntheticEvent} event []
   * @return {void}       []
   */
  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  /**
   * [onSubmit submits the form]
   * @method onSubmit
   * @param  {SyntheticEvent} event []
   * @return {void}       []
   */
  onSubmit(event) {
    event.preventDefault();
    this.setState({
      status: 'Processing'
    });
    this.props.passwordResetMailAction(this.state);
  }
  /**
   * [render displays the html ]
   * @method render
   * @return {ReactElement} [markup]
   */
  render() {
    return (
      <div id="forgetpwd" className="modal fade reg-form">
        <form className="modal-dialog" onSubmit={this.onSubmit}>
          <div className="modal-header">
            <h2 className="form-header" > Forgot Password </h2>
            <span className="center">
              {this.props.response ? this.props.response : this.state.status}</span>
            <h5> Enter your email address to recieve a link to reset your password </h5>
          </div>
          <div className="form-group">
            <input
              type="email"
              name="email"
              onChange={this.onChange}
              className="form-control"
              placeholder="Email"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="submit"
              className="form-control btn deep-purple lighten-3 custombutton"
              value="Submit"
            />
            <button
              type="button"
              className="right modal-close form-header btn deep-purple lighten-4 custombutton"
              data-dismiss="modal"
            >Close</button>
          </div>
        </form>
      </div>
    );
  }
}

ForgetPassword.propTypes = {
  passwordResetMailAction: PropTypes.func.isRequired,
  response: PropTypes.string.isRequired
};

/**
 * [mapStateToProps makes the store data available]
 * @method mapStateToProps
 * @param  {object}        state [the store date]
 * @return {object}              [ the data needed by the component]
 */
const mapStateToProps = (state) => {
  return {
    response: state.resetPasswordReducer.status
  };
};

export default connect(mapStateToProps, { passwordResetMailAction })(ForgetPassword);
