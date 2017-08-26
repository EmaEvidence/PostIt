import axios from 'axios';
import { RESET_PASSWORD_SUCCESS, RESET_PASSWORD_ERROR } from './types/types';

/**
 * [searchUserAction description]
 * @method searchUserAction
 * @param  {[type]}         searchTerm [description]
 * @param  {[type]}         offset     [description]
 * @param  {[type]}         groupId    [description]
 * @return {[type]}                    [description]
 */
export default function resetPasswordAction(newpassword, userKey) {
  return (dispatch) => {
    axios.post('http://localhost:3300/api/v1/user/newpassword', { newpassword, userKey })
    .then((res) => {
      console.log(res.data.message);
      return dispatch({
        status: res.data.message,
        type: RESET_PASSWORD_SUCCESS,
        users: res.data.users
      });
    })
    .catch((error) => {
      console.log(error.response.data.message);
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
}
