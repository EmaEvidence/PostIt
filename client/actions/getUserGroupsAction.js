import axios from 'axios';
import { ADD_USER_GROUPS, ADD_USER_GROUPS_ERROR } from './types/types';

const getUserGroupsAction = (data) => {
  const userId = data.id;
  return (dispatch) => {
    return axios.get('/api/v1/user/groups', { userId })
    .then((res) => {
      dispatch({
        group: [res.data.groups],
        type: ADD_USER_GROUPS
      });
    })
    .catch((err) => {
      dispatch({
        group: [''],
        type: ADD_USER_GROUPS_ERROR,
        message: err.response.data.message
      });
    });
  };
};

export default getUserGroupsAction;
