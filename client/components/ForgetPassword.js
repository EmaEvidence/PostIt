import React from 'react';
import { connect } from 'react-redux';
import passwordResetMailAction from '../actions/passwordResetMailAction';

/**
 * [id description]
 * @type {String}
 */
class ForgetPassword extends React.Component {
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
   * [onChange description]
   * @method onChange
   * @param  {[type]} event [description]
   * @return {[type]}       [description]
   */
  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  onSubmit(event) {
    event.preventDefault();
    this.setState({
      status: 'Processing'
    });
    this.props.passwordResetMailAction(this.state);
  }
  render() {
    return (
      <div id="forgetpwd" className="modal fade reg-form">
        <form className="modal-dialog" onSubmit={this.onSubmit}>
          <div className="modal-header">
            <h2 className="form-header" > Forgot Password </h2>
            <span className="center">{this.props.response ? this.props.response : this.state.status}</span>
            <h5> Enter your email address to recieve a link to reset your password </h5>
          </div>
          <div className="form-group">
            <input type="email" name="email" onChange={this.onChange} className="form-control" placeholder="Email" required />
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

ForgetPassword.PropTypes = {
};

function mapStateToProps(state) {
  return {
    response: state.resetPasswordReducer.status
  };
}

export default connect(mapStateToProps, { passwordResetMailAction })(ForgetPassword);
