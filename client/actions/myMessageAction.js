import axios from 'axios';
import { GET_MY_MESSAGES, GET_MY_MESSAGE_ERROR } from './types/types';

/**
 * [myMessageAction description]
 * @method myMessageAction
 * @return {[type]}        [description]
 */
export default function myMessageAction() {
  const url = '/api/v1/user/mymessage';
  return (dispatch) => {
    axios.get(url)
    .then((res) => {
      dispatch({
        messages: res.data.messages,
        type: GET_MY_MESSAGES
      });
    })
    .catch(() => {
      dispatch({
        message: 'Error Fetching Messa',
        type: GET_MY_MESSAGE_ERROR
      });
    });
  };
}
