import axios from 'axios';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import authAction from './authAction';

const googleAuthAction = (data) => {
  const url = '/api/v1/user/google';
  return (dispatch) => {
    axios.post(url, data)
    .then((res) => {
      const token = res.data.user.token;
      setAuthorizationToken(token);
      dispatch(authAction({
        data: res.data.user
      }, 'Success'));
      window.location = '/messageboard';
    })
    .catch((err) => {
      if (err.response === undefined) {
        dispatch(authAction({
          data: 'Internal Error'
        }, 'Error'));
      } else {
        dispatch(authAction({
          data: err.response.data.message
        }, 'Error'));
      }
    });
  };
};

export default googleAuthAction;
