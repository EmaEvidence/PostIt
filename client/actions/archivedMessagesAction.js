import axios from 'axios';
import { GET_ARCHIVED_MESSAGES,
  GET_ARCHIVED_MESSAGES_ERROR } from './types/types';

/**
 * archivedMessagesAction creates redux actions
 * @method myMessageAction
 *
 * @return {function} redux action
 */
const archivedMessagesAction = () => {
  const url = '/api/v1/user/messages/archived';
  return (dispatch) => {
    axios.get(url)
    .then((res) => {
      dispatch({
        messages: res.data.messages,
        type: GET_ARCHIVED_MESSAGES
      });
    })
    .catch(() => {
      dispatch({
        message: 'Error Fetching Messa',
        type: GET_ARCHIVED_MESSAGES_ERROR
      });
    });
  };
};

export default archivedMessagesAction;
