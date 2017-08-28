import axios from 'axios';
import { RESET_MAIL_SUCCESS, RESET_MAIL_ERROR } from './types/types';

/**
 * [passwordResetAction description]
 * @method passwordResetAction
 * @param  {[type]}            data [description]
 * @return  {[type]}            data [description]
 */
export default function passwordResetMailAction(data) {
  return (dispatch) => {
    axios.post('/api/v1/user/forgetpassword', data)
    .then((res) => {
      return dispatch({
        status: res.data.message,
        type: RESET_MAIL_SUCCESS,
      });
    })
    .catch((err) => {
      return dispatch({
        status: err.response.data.message,
        type: RESET_MAIL_ERROR,
      });
    });
  };
}
