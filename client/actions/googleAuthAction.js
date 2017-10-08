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
      const token = res.data.token;
      setAuthorizationToken(token);
      Materialize.toast(res.data.message, 2500, 'green white-text rounded');
      dispatch(authAction({
        data: res.data.user
      }, 'Success'));
      window.location = '/messageboard';
    })
    .catch((err) => {
      if (err.response === undefined) {
        const errorMessage = 'Internal Server Error';
        Materialize.toast(errorMessage, 2500, 'red white-text rounded');
        dispatch(authAction({
          data: 'Internal Error'
        }, 'Error'));
      } else {
        const errorMessage = err.response.data.message;
        Materialize.toast(errorMessage, 2500, 'red white-text rounded');
        dispatch(authAction({
          data: errorMessage
        }, 'Error'));
      }
    });
  };
};

export default googleAuthAction;
