import axios from 'axios';
import { SET_CURRENT_MESSAGES,
  SET_CURRENT_MESSAGES_ERROR } from './types/types';

/**
 * setCurrentMessagesAction creates redux actions
 * @method setCurrentMessagesAction
 *
 * @param {object} groupData data of current group
 * @param {string} groupName name of current group
 *
 * @return {function} redux action
 */
const setCurrentMessagesAction = (groupData, groupName) => {
  const url = `/api/v1/group/${groupData}/messages`;
  return (dispatch) => {
    return axios.get(url)
  .then(res => dispatch({
    groupName,
    messages: res.data.messages,
    type: SET_CURRENT_MESSAGES,
    status: res.data.message
  }))
  .catch(err => dispatch({
    groupName,
    messages: '',
    type: SET_CURRENT_MESSAGES_ERROR,
    status: err.response.data.message,
  }));
  };
};

export default setCurrentMessagesAction;
