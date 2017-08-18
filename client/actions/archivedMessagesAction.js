import axios from 'axios';
import { GET_ARCHIVED_MESSAGES, GET_ARCHIVED_MESSAGES_ERROR } from './types/types';
/**
 * [myMessageAction description]
 * @method myMessageAction
 * @return {[type]}        [description]
 */
export default function myMessageAction() {
  const url = 'http://localhost:3300/api/user/archivedMessages';
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
}
