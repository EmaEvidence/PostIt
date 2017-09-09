/**
 * reducer
 * @method reducer
 *
 * @param  {Object} state initial state
 * @param  {object} action
 *
 * @return {object} state new state
 */
const reducer = (state = {
  status: ''
}, action) => {
  switch (action.type) {
    case 'ADD_NEW_MEMBER': {
      return { ...state, status: action.status };
    }
    case 'CLEAR_ADD_NEW_MEMBER_STATUS': {
      return { ...state, status: '' };
    }
    default:
      return state;
  }
};

export default reducer;
