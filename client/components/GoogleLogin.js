import React from 'react';
import GoogleLogin from 'react-google-login';


class LoginWithGoogle extends React.Component {
  render() {
    const responseGoogle = (response) => {
      const name = response.w3.ig;
      const email = response.w3.U3;
      if (this.props.type === 'SignUp') {
        this.props.googleAction({ name, email, state: 'Sign Up'});
      } else {
        this.props.googleAction({ name, email, state: 'Sign In' });
      }
    };
    return (
      <GoogleLogin
        clientId={'867735432775-a04ushhrd8m2qhiol116lgcql5crq54r.apps.googleusercontent.com'}
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        className="btn deep-purple lighten-3 google-signup"
      >
        <span> { this.props.type } with Google</span>
      </GoogleLogin>
    );
  }
}

export default LoginWithGoogle;
