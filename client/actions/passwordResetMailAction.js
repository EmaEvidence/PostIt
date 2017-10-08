import axios from 'axios';
import { RESET_MAIL_SUCCESS, RESET_MAIL_ERROR } from './types/types';

/**
 * passwordResetMailAction creates redux actions
 * @method passwordResetMailAction
 *
 * @param  {object} userData userData
 *
 * @return {function} redux action
 */
const passwordResetMailAction = userData => (dispatch) => {
  return axios.post('/api/v1/user/forgotpassword', userData)
    .then((res) => {
      Materialize.toast(res.data.message, 2500, 'green white-text rounded');
      dispatch({
        status: res.data.message,
        type: RESET_MAIL_SUCCESS,
      });
    })
    .catch((err) => {
      const status = err.response.data.message;
      Materialize.toast(status, 2500, 'red white-text rounded');
      dispatch({
        status,
        type: RESET_MAIL_ERROR,
      });
    });
};

export default passwordResetMailAction;
