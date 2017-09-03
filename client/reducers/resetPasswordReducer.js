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
  status: '',
}, action) => {
  switch (action.type) {
    case 'RESET_MAIL_SUCCESS': {
      return { ...state, status: action.status };
    }
    case 'RESET_MAIL_ERROR': {
      return { ...state, status: action.status };
    }
    case 'RESET_PASSWORD_SUCCESS': {
      return { ...state, status: action.status };
    }
    case 'RESET_PASSWORD_ERROR': {
      return { ...state, status: action.status };
    }
    default:
      return state;
  }
};

export default reducer;
