
/**
 * reducer
 * @method reducer
 * @param  {Object}
 * @param  {type} status       description
 * @param  {type} currentGroup description
 * @param  {type} action       description
 * @return {type}              description
 */
export default function reducer(state = {
  currentMembers: [],
  status: '',
  currentGroup: ''
}, action) {
  switch (action.type) {
    case 'SET_CURRENT_MEMBERS': {
      return { ...state,
        currentMembers: action.members,
        status: action.status,
        currentGroup: action.groupName };
    }
    default:
      return state;
  }
}
