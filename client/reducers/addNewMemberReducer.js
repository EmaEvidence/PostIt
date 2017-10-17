/**
 * addNewMemberReducer
 * @method reducer
 *
 * @param  {Object} state initial state
 * @param  {object} action
 *
 * @return {object} state new state
 */
const addNewMemberReducer = (state = {
  status: ''
}, action) => {
  switch (action.type) {
    case 'ADD_NEW_MEMBER_ERROR': {
      return { ...state, status: action.status };
    }
    default:
      return state;
  }
};

export default addNewMemberReducer;
