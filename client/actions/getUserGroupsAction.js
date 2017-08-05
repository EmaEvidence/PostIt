import axios from 'axios';
import { ADD_USER_GROUPS } from './types/types';


export default function getUserGroupsAction(data) {
  const userId = data.id;
  return (dispatch) => {
    axios.get('http://localhost:3300/api/user/groups', { userId })
    .then((res) => {
      return dispatch({
        group: [res.data.data],
        type: ADD_USER_GROUPS
      });
    });
  };
}
