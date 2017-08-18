import axios from 'axios';
import { CREATE_GROUP, CREATE_GROUP_ERROR } from './types/types';

export default function createGroupAction(groupData) {
  return (dispatch) => {
    return axios.post('http://localhost:3300/api/group', groupData)
    .then((res) => {
      dispatch({
        message: res.data.message,
        type: CREATE_GROUP
      });
    })
    .catch((error) => {
      if (error.resonse === undefined) {
        dispatch({
          message: error.response.data.message,
          type: CREATE_GROUP_ERROR
        });
      } else {
        dispatch({
          message: error,
          type: CREATE_GROUP_ERROR
        });
      }
    });
  };
}
