import React from 'react';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import authAction from '../actions/authAction';

class LogIn extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
      password: '',
      status: ''
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e){
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onSubmit(e){
    e.preventDefault();
    this.setState({
      status: 'processing'
    });
    this.props.userSignin(this.state).then((res) => {
      this.setState({
        status: (res.data.message)
      });
      const token = res.data.data.token;
      localStorage.setItem('token', token);
      console.log('======>>>>HERE<<<<=======');
      setAuthorizationToken(token);
      this.props.authUser({
        data: res.data.data
      });
      window.location = '/messageboard';
    }).catch((err) => {
      this.setState({
        status: (err.response.data.message)
      });
    });
  }

  render() {
    return (
      <div id="signin" className="modal fade reg-form" role="dialog">
        <form onSubmit={this.onSubmit} className="modal-dialog">
          <div className="modal-header">
            <h2 className="form-header" >Sign In </h2>
            <p className="center">{this.state.status}</p>
          </div>
          <div className="form-group">
            <input
              type="text"
              onChange={this.onChange}
              className="form-control"
              placeholder="Username"
              value={this.state.username}
              name="username"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              onChange={this.onChange}
              className="form-control"
              placeholder="Password"
              value={this.state.password}
              name="password"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="submit"
              className="form-control btn deep-purple lighten-3 custombutton"
              value="Log In"
            />
            <button
              type="button"
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
  authUser: React.PropTypes.func.isRequired
};

export default LogIn;
