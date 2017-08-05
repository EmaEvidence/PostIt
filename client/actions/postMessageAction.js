import axios from 'axios';
import { POST_MESSAGE, POST_MESSAGE_ERROR } from './types/types';

/**
 * [createGroupAction description]
 * @method createGroupAction
 * @param  {[type]}          groupData [description]
 * @return {[type]}                    [description]
 */
export default function postMessageAction(data) {
  console.log(data);
  const id = data.id;
  const url = `http://localhost:3300/api/group/${id}/message`;
  return (dispatch) => {
    axios.post(url, data)
    .then((res) => {
      console.log(res);
      return dispatch({
        message: res.data.message,
        type: POST_MESSAGE
      });
    })
    .catch((error) => {
      if (error.resonse === undefined) {
        console.log(error);
        return dispatch({
          message: error.response.data.message,
          type: POST_MESSAGE_ERROR
        });
      } else {
        console.log(error.response);
        return dispatch({
          message: error,
          type: POST_MESSAGE_ERROR
        });
      }
    });
  };
}
