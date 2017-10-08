/**
 * postMessageReducer
 * @method reducer
 *
 * @param  {Object} state initial state
 * @param  {object} action
 *
 * @return {object} state new state
 */
const postMessageReducer = (state = {
  status: ''
}, action) => {
  switch (action.type) {
    case 'POST_MESSAGE': {
      return { ...state, status: action.message };
    }
    case 'POST_MESSAGE_ERROR': {
      return { ...state, status: action.message };
    }
    default:
      return state;
  }
};

export default postMessageReducer;
