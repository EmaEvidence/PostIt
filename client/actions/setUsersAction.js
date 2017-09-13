import axios from 'axios';
import { SET_USERS } from './types/types';

const setUsersAction = data => (dispatch) => {
  return axios.get('/api/v1/user/all')
    .then((res) => {
      const users = res.data.users;
      dispatch({
        currentGroup: data,
        type: SET_USERS,
        users
      });
    });
};

export default setUsersAction;
