import axios from 'axios';

import setAuthorizationToken from '../utils/setAuthorizationToken';
import authAction from './authAction';

/**
 * userSignUpRequest creates redux actions
 * @method userSignUpRequest
 *
 * @param {object} userData users data
 *
 * @return {function} redux action
 */
const userSignUpRequest = userData => (dispatch) => {
  return axios.post('/api/v1/user/signup', userData)
    .then((res) => {
      const token = res.data.user.token;
      setAuthorizationToken(token);
      $('.modal').modal('close');
      Materialize.toast(res.data.message, 2500, 'green white-text rounded');
      dispatch(authAction({
        data: res.data.user
      }, 'Success'));
      location.href = '/messageboard';
    }).catch((err) => {
      if (err.response === undefined) {
        dispatch(authAction({
          data: 'Internal Error'
        }, 'Error'));
      } else {
        Materialize.toast(err.response.data.message, 2500, 'red white-text rounded');
        dispatch(authAction({
          data: err.response.data.message
        }, 'Error'));
      }
    });
};

export default userSignUpRequest;
