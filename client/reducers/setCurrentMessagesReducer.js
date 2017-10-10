/**
 * setCurrentMessagesReducer
 * @method reducer
 *
 * @param  {Object} state initial state
 * @param  {object} action
 *
 * @return {object} state new state
 */
const setCurrentMessagesReducer = (state = {
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
    case 'POST_MESSAGE_TO_CURRENT_GROUP': {
      const newState = { ...state };
      newState.currentMessages = [...newState.currentMessages,
        action.messageData];
      return { ...state, ...newState };
    }
    default:
      return state;
  }
};

export default setCurrentMessagesReducer;
