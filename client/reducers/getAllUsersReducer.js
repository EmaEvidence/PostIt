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
  users: [],
}, action) => {
  switch (action.type) {
    case 'GET_USERS': {
      return { ...state, users: [...action.users] };
    }
    case 'GET_USERS_ERROR': {
      return { ...state };
    }
    default:
      return state;
  }
};

export default reducer;
