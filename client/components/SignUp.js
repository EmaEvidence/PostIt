import React from 'react';

class SignUp extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      name: 'Ema ALabi',
      username: '',
      email: '',
      password: '',
      cpassword: ''
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.userSignupRequest(this.state);
  }

  render() {
    return (
      <div id="signup" className="modal fade reg-form" role="dialog">
        <form className="modal-dialog" onSubmit={this.onSubmit}>
          <div className="modal-header">
            <h2 className="form-header" >Sign Up </h2>
            <button
              type="button"
              className="close form-header"
              data-dismiss="modal"
            >&times;</button>
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
            <label htmlFor="email" data-error="wrong email" data-success="right email" />
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
            <span id="showvalidity" />
            <input
              type="password"
              onChange={this.onChange}
              className="form-control"
              value={this.state.cpassword}
              placeholder="Confirm Password"
              name="cpassword"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="submit"
              className="form-control btn deep-purple lighten-3 custombutton"
              value="Submit"
            />
          </div>
        </form>
      </div>
    );
  }
}

SignUp.propTypes = {
  userSignupRequest: React.PropTypes.func.isRequired
};
export default SignUp;
