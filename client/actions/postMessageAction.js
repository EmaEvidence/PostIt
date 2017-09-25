import axios from 'axios';
import { POST_MESSAGE, POST_MESSAGE_ERROR, POST_MESSAGE_TO_CURRENT_GROUP } from './types/types';

const postMessageAction = (data) => {
  const id = data.id;
  const url = `/api/v1/group/${id}/message`;
  return (dispatch) => {
    return axios.post(url, data)
    .then((res) => {
      Materialize.toast(res.data.message, 2500, 'green white-text rounded');
      if (data.currentGroup === data.groupName) {
        dispatch({
          messageData: res.data.messageData,
          type: POST_MESSAGE_TO_CURRENT_GROUP
        });
      } else {
        dispatch({
          message: res.data.message,
          type: POST_MESSAGE
        });
      }
    })
    .catch((error) => {
      if (error.response !== undefined) {
        Materialize.toast(error.response.data.message, 2500, 'red white-text rounded');
        return dispatch({
          message: error.response.data.message,
          type: POST_MESSAGE_ERROR
        });
      } else {
        Materialize.toast('Internal Server Error', 2500, 'red white-text rounded');
        return dispatch({
          message: error,
          type: POST_MESSAGE_ERROR
        });
      }
    });
  };
};

export default postMessageAction;
