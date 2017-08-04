import axios from 'axios';
import { CREATE_GROUP, CREATE_GROUP_ERROR } from './types/types';

export default function createGroupAction(groupData) {
  return (dispatch) => {
    axios.post('http://localhost:3300/api/group', groupData)
    .then((res) => {
      return dispatch({
        message: res.data.message,
        type: CREATE_GROUP
      });
    })
    .catch((error) => {
      if (error.resonse === undefined){
        return dispatch({
          message: error.response.data.message,
          type: CREATE_GROUP_ERROR
        });
      } else {
        return dispatch({
          message: error,
          type: CREATE_GROUP_ERROR
        });
      }
    });
  };
}
