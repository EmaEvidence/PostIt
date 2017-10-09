import axios from 'axios';
import { GET_MY_MESSAGES, GET_MY_MESSAGE_ERROR } from './types/types';

/**
 * myMessageAction create redux action
 * @method myMessageAction
 *
 * @return {function} redux action
 */
const myMessageAction = () => {
  const url = '/api/v1/user/messages';
  return (dispatch) => {
    return axios.get(url)
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
};

export default myMessageAction;
