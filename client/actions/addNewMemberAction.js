import axios from 'axios';
import { ADD_NEW_MEMBER, ADD_NEW_MEMBER_ERROR } from './types/types';

const addNewMemberAction = (groupId, userId) => (dispatch) => {
  return axios.post(`/api/v1/group/${groupId}/user`, { user: userId })
    .then((res) => {
      Materialize.toast(res.data.message, 2500, 'green white-text rounded');
      dispatch({
        type: ADD_NEW_MEMBER,
        status: res.data.message,
        group: {
          id: groupId,
          Users: [{ id: userId }]
        }
      });
    })
    .catch((err) => {
      Materialize.toast(err.response.data.message, 2500, 'red white-text rounded');
      dispatch({
        type: ADD_NEW_MEMBER_ERROR,
        status: err.response.data.message
      });
    });
};

export default addNewMemberAction;
