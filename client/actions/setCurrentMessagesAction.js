import axios from 'axios';
import { SET_CURRENT_MESSAGES, SET_CURRENT_MESSAGES_ERROR } from './types/types';

const setCurrentMessagesAction = (data, groupName) => {
  const url = `/api/v1/group/${data}/messages`;
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
