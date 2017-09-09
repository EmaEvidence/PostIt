import axios from 'axios';
import { GET_ARCHIVED_MESSAGE, GET_ARCHIVED_MESSAGE_ERROR } from './types/types';

const archivedMessageAction = (groupId, groupName) => (dispatch) => {
  const url = `/api/v1/user/${groupId}/messages/archived`;
  axios.get(url)
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

export default archivedMessageAction;
