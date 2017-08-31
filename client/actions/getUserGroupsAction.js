import axios from 'axios';
import { ADD_USER_GROUPS } from './types/types';

/**
 * [getUserGroupsAction description]
 * @method getUserGroupsAction
 * @param  {[type]}            data [description]
 * @return {[type]}                 [description]
 */
export default function getUserGroupsAction(data) {
  const userId = data.id;
  return (dispatch) => {
    axios.get('/api/v1/user/groups', { userId })
    .then((res) => {
      dispatch({
        group: [res.data.groups],
        type: ADD_USER_GROUPS
      });
    })
    .catch((err) => {
      dispatch({
        group: [''],
        type: ADD_USER_GROUPS,
        message: err.response.data.message
      });
    });
  };
}
