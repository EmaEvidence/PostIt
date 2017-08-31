import axios from 'axios';

import setAuthorizationToken from '../utils/setAuthorizationToken';
import authAction from './authAction';

/**
 * [userSignupRequest description]
 * @method userSignupRequest
 * @param  {[type]}          userData [description]
 * @return {[type]}                   [description]
 */
export default function userSignupRequest(userData) {
  return (dispatch) => {
    axios.post('/api/v1/user/signup', userData)
    .then((res) => {
      const token = res.data.user.token;
      setAuthorizationToken(token);
      dispatch(authAction({
        data: res.data.user
      }, 'Success'));
      window.location = '/messageboard';
    }).catch((err) => {
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
}
