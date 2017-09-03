/**
 * reducer
 * @method reducer
 * @param  {Object}
 * @param  {string} status
 * @param  {number} currentGroup
 * @param  {string} action
 * @return {object} state
 */
export default function reducer(state = {
  archivedMessages: [],
  status: '',
  currentGroup: ''
}, action) {
  switch (action.type) {
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
}
