import axios from 'axios';
import { SET_CURRENT_MEMBERS } from './types/types';

const setCurrentMembersAction = (data, groupName) => {
  const url = `/api/v1/group/${data}/users`;
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
