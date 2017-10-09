import axios from 'axios';
import { SET_CURRENT_MEMBERS } from './types/types';

/**
 * setCurrentMembersAction creates redux action
 * @method setCurrentMembersAction
 *
 * @param {object} groupData data of current group
 * @param {string} groupName name of current group
 *
 * @return {function} redux action
 */
const setCurrentMembersAction = (groupData, groupName) => {
  const url = `/api/v1/group/${groupData}/users`;
  return (dispatch) => {
    return axios.get(url)
  .then(res => dispatch({
    groupName,
    members: res.data.users,
    status: res.data.message,
    type: SET_CURRENT_MEMBERS,
  }))
  .catch(err => dispatch({
    groupName,
    messages: '',
    type: SET_CURRENT_MEMBERS,
    status: err.response.data.message,
  }));
  };
};


export default setCurrentMembersAction;
