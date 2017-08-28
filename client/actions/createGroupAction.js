import axios from 'axios';
import { CREATE_GROUP, CREATE_GROUP_ERROR } from './types/types';
import getUserGroupsAction from './getUserGroupsAction';

export default function createGroupAction(groupData, id) {
  return (dispatch, getState) => {
    const groups = getState().getUserGroupsReducer.groups;
    return axios.post('/api/v1/group', groupData)
    .then((res) => {
      groups.push(res.data.group);
      dispatch(getUserGroupsAction({ id }));
      dispatch({
        message: res.data.message,
        type: CREATE_GROUP,
        groups
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
