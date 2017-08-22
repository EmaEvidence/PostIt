import axios from 'axios';
import { SET_CURRENT_MESSAGES } from './types/types';


export default function setCurrentMessagesAction(data, groupName) {
  const url = `http://localhost:3300/api/group/${data}/messages`;
  return (dispatch) => {
    axios.get(url)
  .then((res) => {
    const messages = res.data.messages;
    const status = res.data.message;
    return dispatch({
      messages,
      type: SET_CURRENT_MESSAGES,
      status,
      groupName
    });
  })
  .catch((err) => {
    const status = err.response.data.message;
    return dispatch({
      messages: '',
      type: SET_CURRENT_MESSAGES,
      status,
      groupName
    });
  });
  };
}
