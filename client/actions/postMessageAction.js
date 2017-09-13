import axios from 'axios';
import { POST_MESSAGE, POST_MESSAGE_ERROR } from './types/types';

const postMessageAction = (data) => {
  const id = data.id;
  const url = `/api/v1/group/${id}/message`;
  return (dispatch) => {
    return axios.post(url, data)
    .then(res => dispatch({
      message: res.data.message,
      type: POST_MESSAGE
    }))
    .catch((error) => {
      if (error.response !== undefined) {
        return dispatch({
          message: error.response.data.message,
          type: POST_MESSAGE_ERROR
        });
      } else {
        return dispatch({
          message: error,
          type: POST_MESSAGE_ERROR
        });
      }
    });
  };
};

export default postMessageAction;
