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
    case 'POST_MESSAGE': {
      return { ...state, status: action.message };
    }
    case 'POST_MESSAGE_ERROR': {
      return { ...state, status: action.message };
    }
    case 'CLEAR_POST_MESSAGE_STATUS': {
      return { ...state, status: '' };
    }
    default:
      return state;
  }
};

export default reducer;
