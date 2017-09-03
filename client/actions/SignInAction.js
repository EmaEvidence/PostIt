import axios from 'axios';

import setAuthorizationToken from '../utils/setAuthorizationToken';
import authAction from './authAction';

const userSigninRequest = userData => (dispatch) => {
  axios.post('/api/v1/user/signin', userData)
    .then((res) => {
      const token = res.data.user.token;
      setAuthorizationToken(token);
      dispatch(authAction({
        data: res.data.user
      }, 'Success'));
      window.location = '/messageboard';
    }).catch((err) => {
      dispatch(authAction({
        data: err.response.data.message
      }, 'Error'));
    });
};

export default userSigninRequest;
