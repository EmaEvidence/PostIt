import * as types from './types/types';

const clearStatus = action => (dispatch) => {
  if (action === 'searchUser') {
    return dispatch({
      message: '',
      searchResult: [],
      type: types.CLEAR_SEARCH_USER_STATUS
    });
  }
};

export default clearStatus;
