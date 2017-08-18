import axios from 'axios';
import setAuthorizationToken from '../utils/setAuthorizationToken';

export default function userSigninRequest(userData) {
  return (dispatch) => {
    return axios.post('http://127.0.0.1:3300/api/user/signin', userData);
  };
}
