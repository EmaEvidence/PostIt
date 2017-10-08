/**
 * setUsersReducer
 * @method reducer
 *
 * @param  {Object} state initial state
 * @param  {object} action
 *
 * @return {object} state new state
 */
const setUsersReducer = (state = {
  currentGroup: '',
  users: {},
}, action) => {
  switch (action.type) {
    case 'SET_USERS': {
      return { ...state,
        currentGroup: action.currentGroup,
        users: action.users };
    }
    default:
      return state;
  }
};

export default setUsersReducer;
