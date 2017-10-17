/**
 * messagesReducer
 * @method messagesReducer
 *
 * @param  {Object} state initial state
 * @param  {object} action
 *
 * @return {object} state new state
 */
const messageReducer = (state = {
  currentMessages: [],
  status: '',
  currentGroup: '',
  archivedMessages: [],
  myMessages: []
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
      return newState;
    }
    case 'POST_MESSAGE': {
      return { ...state, status: action.message };
    }
    case 'POST_MESSAGE_ERROR': {
      return { ...state, status: action.message };
    }
    case 'GET_MY_MESSAGES': {
      return { ...state, myMessages: [...action.messages] };
    }
    case 'GET_ARCHIVED_MESSAGE': {
      return { ...state,
        archivedMessages: action.messages,
        status: action.status,
        currentGroup: action.groupName };
    }
    case 'GET_ARCHIVED_MESSAGE_ERROR': {
      return { ...state,
        archivedMessages: [],
        status: action.status,
        currentGroup: action.groupName };
    }
    default:
      return state;
  }
};

export default messageReducer;
