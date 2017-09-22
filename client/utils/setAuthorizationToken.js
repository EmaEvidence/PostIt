import axios from 'axios';

/**
 * setAuthorizationToken attaches the Authorization token to every request
 * @method setAuthorizationToken
 *
 * @param  {[type]} token JSON web token issues upon Successful authentication
 *
 * @return {void}
 */
const setAuthorizationToken = (token) => {
  if (token) {
    window.localStorage.setItem('token', token);
    axios.defaults.headers.common['Authorization'] = token;
  } else {
    window.localStorage.removeItem('token');
    delete axios.defaults.headers.common.Authorization;
  }
};

export default setAuthorizationToken;
