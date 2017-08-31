import React from 'react';
import GoogleLogin from 'react-google-login';
import PropTypes from 'prop-types';

/**
 * [LoginWithGoogle enables signing up and in with google+]
 */
class LoginWithGoogle extends React.Component {
  /**
   * [render displays the html ]
   * @method render
   * @return {ReactElement} [markup]
   */
  render() {
    const responseGoogle = (response) => {
      const name = response.w3.ig;
      const email = response.w3.U3;
      if (this.props.type === 'Sign Up') {
        this.props.googleAction({ name, email, state: 'Sign Up' });
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

LoginWithGoogle.propTypes = {
  googleAction: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
};

export default LoginWithGoogle;
