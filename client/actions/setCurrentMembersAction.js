import axios from 'axios';
import { SET_CURRENT_MEMBERS } from './types/types';

export default function setCurrentMembersAction(data, groupName) {
  const url = `http://localhost:3300/api/group/${data}/users`;
  return (dispatch) => {
    axios.get(url)
  .then((res) => {
    const messages = res.data.data;
    const status = res.data.message;
    return dispatch({
      messages,
      type: SET_CURRENT_MEMBERS,
      status,
      groupName
    });
  })
  .catch((err) => {
    const status = err.response.data.message;
    return dispatch({
      messages: '',
      type: SET_CURRENT_MEMBERS,
      status,
      groupName
    });
  });
  };
}
