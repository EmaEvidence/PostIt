import axios from 'axios';
import { GET_ARCHIVED_MESSAGE, GET_ARCHIVED_MESSAGE_ERROR } from './types/types';

const archivedMessageAction = (data, groupName) => {
  return (dispatch) => {
    axios.get('/api/v1/user/messages/archived')
  .then((res) => {
    const messages = res.data.messages;
    const status = res.data.message;
    return dispatch({
      messages,
      type: GET_ARCHIVED_MESSAGE,
      status,
      groupName
    });
  })
  .catch((err) => {
    const status = err.response.data.message;
    return dispatch({
      messages: '',
      type: GET_ARCHIVED_MESSAGE_ERROR,
      status,
      groupName
    });
  });
  };
};

export default archivedMessageAction;
