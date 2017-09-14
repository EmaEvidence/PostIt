import axios from 'axios';
import { RESET_PASSWORD_SUCCESS, RESET_PASSWORD_ERROR } from './types/types';

const resetPasswordAction = (newPassword, userKey) => (dispatch) => {
  return axios.post('/api/v1/user/newpassword', { newPassword, userKey })
    .then(res => dispatch({
      status: res.data.message,
      type: RESET_PASSWORD_SUCCESS,
      users: res.data.users
    }))
    .catch((error) => {
      if (error.resonse === undefined) {
        return dispatch({
          status: error.response.data.message,
          type: RESET_PASSWORD_ERROR
        });
      } else {
        return dispatch({
          status: error.response.message,
          type: RESET_PASSWORD_ERROR
        });
      }
    });
};


export default resetPasswordAction;
