import axios from 'axios';
import { CREATE_GROUP, CREATE_GROUP_ERROR } from './types/types';
import getUserGroupsAction from './getUserGroupsAction';

export default function createGroupAction(groupData, id) {
  return (dispatch) => {
    return axios.post('/api/v1/group', groupData)
    .then((res) => {
      dispatch({
        message: res.data.message,
        type: CREATE_GROUP,
        group: res.data.group
      });
      dispatch(getUserGroupsAction({ id }));
    })
    .catch((error) => {
      if (error.resonse === undefined) {
        dispatch({
          message: error.response.data.message,
          type: CREATE_GROUP_ERROR
        });
      } else {
        dispatch({
          message: error.response.data.message,
          type: CREATE_GROUP_ERROR
        });
      }
    });
  };
}
