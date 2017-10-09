import axios from 'axios';
import { RESET_PASSWORD_SUCCESS, RESET_PASSWORD_ERROR } from './types/types';

/**
 * resetPasswordAction creates redux action
 * @method resetPasswordAction
 *
 * @param {string} newPassword users new password
 * @param {string} userKey hashed user key
 *
 * @return {function} redux action
 */
const resetPasswordAction = (newPassword, userKey) => (dispatch) => {
  return axios.post('/api/v1/user/newpassword', { newPassword, userKey })
    .then((res) => {
      Materialize.toast(res.data.message, 2500, 'green white-text rounded');
      dispatch({
        status: res.data.message,
        type: RESET_PASSWORD_SUCCESS,
        users: res.data.users
      });
    })
    .catch((error) => {
      if (error.resonse === undefined) {
        Materialize.toast(error.response.data.message, 2500, 'red white-text rounded');
        return dispatch({
          status: error.response.data.message,
          type: RESET_PASSWORD_ERROR
        });
      } else {
        Materialize.toast('Internal Server Error', 2500, 'red white-text rounded');
        return dispatch({
          status: error.response.message,
          type: RESET_PASSWORD_ERROR
        });
      }
    });
};


export default resetPasswordAction;
