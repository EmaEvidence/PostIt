import axios from 'axios';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import authAction from './authAction';

/**
 * googleAuthAction creates redux actions
 * @method googleAuthAction
 *
 * @param  {object} authData new users info
 *
 * @return {function} redux action
 */
const googleAuthAction = (authData) => {
  const url = '/api/v1/user/google';
  return (dispatch) => {
    return axios.post(url, authData)
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
