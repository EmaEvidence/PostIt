import axios from 'axios';
import { SEARCH_USER, SEARCH_USER_ERROR } from './types/types';

/**
 * [searchUserAction description]
 * @method searchUserAction
 * @param  {[type]}         searchTerm [description]
 * @param  {[type]}         offset     [description]
 * @param  {[type]}         groupId    [description]
 * @return {[type]}                    [description]
 */
export default function searchUserAction(searchTerm, offset, groupId) {
  const payload = {
    searchTerm,
    offset,
    groupId
  };
  return (dispatch) => {
    axios.post('http://localhost:3300/api/v1/users/search', payload)
    .then((res) => {
      return dispatch({
        message: res.data.message,
        type: SEARCH_USER,
        users: res.data.users,
        count: res.data.count
      });
    })
    .catch((error) => {
      if (error.resonse === undefined) {
        return dispatch({
          message: error.response.data.message,
          type: SEARCH_USER_ERROR
        });
      } else {
        return dispatch({
          message: error,
          type: SEARCH_USER_ERROR
        });
      }
    });
  };
}
