import * as types from './types/types';

export default function clearStoreAction(action) {
  return (dispatch) => {
    if (action === 'sendMessage') {
      dispatch({
        message: '',
        type: types.CLEAR_POST_MESSAGE_STATUS,
      });
    } else if (action === 'createGroup') {
      dispatch({
        message: '',
        type: types.CLEAR_CREATE_GROUP_STATUS
      });
    } else if (action === 'searchUser') {
      dispatch({
        message: '',
        type: types.CLEAR_SEARCH_USER_STATUS
      });
    } else {
      dispatch({
        message: '',
        type: types.CLEAR_ADD_NEW_MEMBER_STATUS
      });
    }
  };
}
