import React from 'react';
import { connect } from 'react-redux';

class SignUp extends React.Component {
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
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }


  onSubmit(e) {
    e.preventDefault();
    this.props.userSignup(this.state).then((res) => {
      this.setState({
        status: (res.data.message)
      });
      const token = res.data.data.token;
      localStorage.setItem('token', token);
      window.location = '/messageboard';
      this.props.authUser({
        data: res.data.data
      });
    }).catch((err) => {
      if (err.response === undefined) {
        console.log(err);
        this.setState({
          status: ('Internal Error')
        });
      } else {
        this.setState({
          status: (err.response.data.message)
        });
      }
    });
  }

  checkPassword(e){
    if (this.state.password === this.state.cpassword) {
      this.setState({
        pwdmatch: 'password matches',
      });
      this.refs.submit.disabled = false;
    } else {
      this.setState({
        pwdmatch: 'password does not matches',
      });
      this.refs.submit.disabled = true;
    }
  }

  render() {
    return (
      <div id="signup" className="modal fade reg-form" role="dialog">
        <form className="modal-dialog signupform" onSubmit={this.onSubmit}>
          <div className="modal-header mo">
          {this.props.messages}
            <h2 className="form-header center" >Sign Up </h2>
            <a href="" className="sign-with-google center">Sign Up with Google+ </a>
            <p className="alert center">{this.state.status}</p>
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
              type="button"
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
  authUser: React.PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    messages: state.message
  };
}
export default connect(mapStateToProps)(SignUp);
