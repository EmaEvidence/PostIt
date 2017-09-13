import axios from 'axios';
import { ADD_NEW_MEMBER, ADD_NEW_MEMBER_ERROR } from './types/types';

const addNewMemberAction = (groupId, userId) => (dispatch) => {
  return axios.post(`/api/v1/group/${groupId}/user`, { user: userId })
    .then(res => dispatch({
      type: ADD_NEW_MEMBER,
      status: res.data.message
    }))
    .catch(err => dispatch({
      type: ADD_NEW_MEMBER_ERROR,
      status: err.response.data.message
    }));
};

export default addNewMemberAction;
