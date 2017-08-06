import { SET_CURRENT_GROUP_ID } from './types/types';


export default function setCurrentGroupAction(data) {
  return (dispatch) => {
    return dispatch({
      current_group: data,
      type: SET_CURRENT_GROUP_ID
    });
  };
}
