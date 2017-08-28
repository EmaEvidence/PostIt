import axios from 'axios';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import authAction from './authAction';

export default function userSigninRequest(userData) {
  return (dispatch) => {
    axios.post('http://127.0.0.1:3300/api/v1/user/signin', userData)
    .then((res) => {
      const token = res.data.user.token;
      setAuthorizationToken(token);
      dispatch(authAction({
        data: res.data.user
      }, 'Success'));
      window.location = '/messageboard';
      console.log('123456');
    }).catch((err) => {
      console.log(err, '======error======');
      dispatch(authAction({
        data: err.response.data.message
      }, 'Error'));
    });
  };
}
