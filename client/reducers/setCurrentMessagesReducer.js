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
  currentMessages: [],
  status: '',
  currentGroup: ''
}, action) => {
  switch (action.type) {
    case 'SET_CURRENT_MESSAGES': {
      return { ...state,
        currentMessages: action.messages,
        status: action.status,
        currentGroup: action.groupName };
    }
    case 'SET_CURRENT_MESSAGES_ERROR': {
      return { ...state,
        currentMessages: [],
        status: action.status,
        currentGroup: action.groupName };
    }
    default:
      return state;
  }
};

export default reducer;
