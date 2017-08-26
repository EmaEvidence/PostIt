import axios from 'axios';
import { SET_USERS } from './types/types';


export default function setUsersAction(data, groupName) {
  return (dispatch) => {
    axios.get('http://localhost:3300/api/v1/user/all')
    .then((res) => {
      const users = res.data.users;
      return dispatch({
        current_group: data,
        type: SET_USERS,
        users
      });
    });
  };
}
