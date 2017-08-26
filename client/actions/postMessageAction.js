import axios from 'axios';
import { POST_MESSAGE, POST_MESSAGE_ERROR } from './types/types';

/**
 * [createGroupAction description]
 * @method createGroupAction
 * @param  {[type]}          groupData [description]
 * @return {[type]}                    [description]
 */
export default function postMessageAction(data) {
  const id = data.id;
  const url = `http://localhost:3300/api/v1/group/${id}/message`;
  return (dispatch) => {
    axios.post(url, data)
    .then((res) => {
      return dispatch({
        message: res.data.message,
        type: POST_MESSAGE
      });
    })
    .catch((error) => {
      if (error.resonse === undefined) {
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
}
