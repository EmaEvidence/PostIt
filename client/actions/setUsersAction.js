import axios from 'axios';
import { SET_USERS } from './types/types';


export default function setUsersAction(data, groupName) {
  return (dispatch) => {
    axios.get('/api/v1/user/all')
    .then((res) => {
      const users = res.data.users;
      dispatch({
        currentGroup: data,
        type: SET_USERS,
        users
      });
    });
  };
}
