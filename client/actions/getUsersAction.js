import axios from 'axios';
import { GET_USERS, GET_USERS_ERROR } from './types/types';

/**
 * getUsersAction creates group actions
 * @method getUsersAction
 *
 * @return {function} redux action
 */
const getUsersAction = () => (dispatch) => {
  return axios.get('/api/v1/user/all')
    .then((res) => {
      const result = res.data.users;
      const users = result.map(user => user.username);
      dispatch({
        type: GET_USERS,
        users
      });
    })
    .catch(() => {
      dispatch({
        type: GET_USERS_ERROR,
        users: []
      });
    });
};

export default getUsersAction;
