import axios from 'axios';

export default function userSignupRequest(userData) {
  return (dispatch) => {
    return axios.post('http://127.0.0.1:3300/api/user/signup', userData);
  };
}
