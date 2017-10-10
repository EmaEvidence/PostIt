import axios from 'axios';

/**
 * verifyTokenAction confirms if token is valid
 * @method verifyTokenAction
 *
 * @param {string} token users json web token
 *
 * @return {function} redux action
 */
const verifyTokenAction = (token) => {
  return axios.post('/api/v1/user/verify', { token, key: 'token' });
};

export default verifyTokenAction;
