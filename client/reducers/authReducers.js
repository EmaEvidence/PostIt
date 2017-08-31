/**
 * reducer
 * @method reducer
 *
 * @param  {Object} state
 * @param  {object} action
 *
 * @return {type} []
 */
const reducer = (state = {
  loggedIn: false,
  userDetails: {},
  authMessage: ''
}, action) => {
  switch (action.type) {
    case 'ADD_USER_DETAILS': {
      return { ...state,
        loggedIn: true,
        userDetails: action.data,
        authMessage: 'Successful'
      };
    }
    case 'ADD_USER_DETAILS_ERROR': {
      return { ...state,
        loggedIn: false,
        authMessage: action.data
      };
    }
    default:
      return state;
  }
};

export default reducer;
