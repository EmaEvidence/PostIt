/**
 * authReducer
 * @method reducer
 *
 * @param  {Object} state initial state
 * @param  {object} action
 *
 * @return {object} state new state
 */
const authReducer = (state = {
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
    case 'CLEAR_NOTIFICATION': {
      const newState = { ...state };
      newState.userDetails.notifications = [];
      return newState;
    }
    default:
      return state;
  }
};

export default authReducer;
