import axios from 'axios';
import { ADD_USER_GROUPS, ADD_USER_GROUPS_ERROR } from './types/types';

/**
 * getUserGroupsAction creates redux action
 * @method getUserGroupsAction
 *
 * @param {object} userData users information
 *
 * @return {function} redux action
 */
const getUserGroupsAction = (userData) => {
  const userId = userData.id;
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
