/**
 * reducer
 * @method reducer
 * @param  {Object}
 * @param  {type} status        description
 * @param  {type} currentGroup description
 * @param  {type} action       description
 * @return {type}              description
 */
export default function reducer(state = {
  currentMessages: [],
  status: '',
  currentGroup: ''
}, action) {
  switch (action.type) {
    case 'SET_CURRENT_MESSAGES': {
      return { ...state,
        currentMessages: action.messages,
        status: action.status,
        currentGroup: action.groupName };
    }
    default:
      return state;
  }
}
