import * as types from './types/types';

/**
 * clearStatus creates redux actions
 * @method clearStatus
 *
 * @param  {string} action name of action triggering this action
 *
 * @return {function} redux action
 */
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
