import axios from 'axios';
import { SEARCH_USER, SEARCH_USER_ERROR } from './types/types';

const searchUserAction = (searchTerm, offset, groupId) => {
  const payload = {
    searchTerm,
    offset,
    groupId
  };
  return (dispatch) => {
    return axios.post('/api/v1/users/search', payload)
    .then(res => dispatch({
      message: res.data.message,
      type: SEARCH_USER,
      users: res.data.users,
      count: res.data.count
    }))
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
};

export default searchUserAction;
