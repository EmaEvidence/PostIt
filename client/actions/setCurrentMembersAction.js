import axios from 'axios';
import { SET_CURRENT_MEMBERS } from './types/types';

const setCurrentMembersAction = (data, groupName) => {
  const url = `/api/v1/group/${data}/users`;
  return (dispatch) => {
    axios.get(url)
  .then((res) => {
    const members = res.data.users;
    const status = res.data.message;
    return dispatch({
      members,
      type: SET_CURRENT_MEMBERS,
      status,
      groupName
    });
  })
  .catch((err) => {
    const status = err.response.data.message;
    return dispatch({
      messages: '',
      type: SET_CURRENT_MEMBERS,
      status,
      groupName
    });
  });
  };
};


export default setCurrentMembersAction;
