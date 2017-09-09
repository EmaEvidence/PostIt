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
  currentMembers: [],
  status: '',
  currentGroup: ''
}, action) => {
  switch (action.type) {
    case 'SET_CURRENT_MEMBERS': {
      return { ...state,
        currentMembers: action.members,
        status: action.status,
        currentGroup: action.groupName };
    }
    default:
      return state;
  }
};

export default reducer;
