import axios from 'axios';
import { ADD_NEW_MEMBER, ADD_NEW_MEMBER_ERROR } from './types/types';

/**
 * addNewMemberAction creates redux actions
 * @method addNewMemberAction
 *
 * @param  {number} groupId unique identifer for a group
 * @param  {number} userId unique identifer for a user
 *
 * @return {function} redux action
 */
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
      const status = err.response.data.message;
      Materialize.toast(status, 2500, 'red white-text rounded');
      dispatch({
        type: ADD_NEW_MEMBER_ERROR,
        status
      });
    });
};

export default addNewMemberAction;
