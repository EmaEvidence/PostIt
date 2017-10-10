import React from 'react';
import GoogleLogin from 'react-google-login';
import PropTypes from 'prop-types';

/**
 * GoogleAuth provides the option to sign up/sign in with google+
 * @method LoginWithGoogle
 *
 * @param  {object} props store data passed to the component
 *
 * @return {ReactElement} markup
 */
const GoogleAuth = (props) => {
  const responseGoogle = (response) => {
    if (response.w3 !== undefined) {
      const name = response.w3.ig;
      const email = response.w3.U3;
      if (props.type === 'Sign Up') {
        props.googleAction({ name, email, state: 'Sign Up' });
      } else {
        props.googleAction({ name, email, state: 'Sign In' });
      }
    }
  };
  return (
    <GoogleLogin
      clientId={'867735432775-a04ushhrd8m2qhiol116lgcql5crq54r.apps.googleusercontent.com'}
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      className="btn deep-purple lighten-3 google-signup"
    >
      <span> { props.type } with Google</span>
    </GoogleLogin>
  );
};

GoogleAuth.propTypes = {
  googleAction: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
};

export default GoogleAuth;
