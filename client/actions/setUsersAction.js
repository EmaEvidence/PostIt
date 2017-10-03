import axios from 'axios';
import { SET_USERS } from './types/types';

/**
 * setUsersAction creates redux action
 * @method setUsersAction
 *
 * @param {object} groupData users data
 *
 * @return {function} redux action
 */
const setUsersAction = groupData => (dispatch) => {
  return axios.get('/api/v1/user/all')
    .then((res) => {
      dispatch({
        currentGroup: groupData,
        type: SET_USERS,
        users: res.data.users
      });
    });
};

export default setUsersAction;
