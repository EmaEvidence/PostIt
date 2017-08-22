import axios from 'axios';

/**
 * [setAuthorizationToken inserts token to every http request]
 * @method setAuthorizationToken
 * @param  {[string]}              token [the token returned after successful authentication]
 */
export default function setAuthorizationToken(token) {
  if (token) {
    window.localStorage.setItem('token', token);
    axios.defaults.headers.common['Authorization'] = token;
  } else {
    window.localStorage.removeItem('token');
    delete axios.defaults.headers.common.Authorization;
  }
}
