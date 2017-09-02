import axios from 'axios';
import { RESET_MAIL_SUCCESS, RESET_MAIL_ERROR } from './types/types';

const passwordResetMailAction = data => (dispatch) => {
  axios.post('/api/v1/user/forgetpassword', data)
    .then(res => dispatch({
      status: res.data.message,
      type: RESET_MAIL_SUCCESS,
    }))
    .catch(err => dispatch({
      status: err.response.data.message,
      type: RESET_MAIL_ERROR,
    }));
};

export default passwordResetMailAction;
