/**
 * [reducer description]
 * @method reducer
 * @param  {Object} [state={                    current_members: []] [description]
 * @param  {[type]} status        [description]
 * @param  {[type]} current_group [description]
 * @param  {[type]} action        [description]
 * @return {[type]}               [description]
 */
export default function reducer(state = {
  current_members: [],
  status: '',
  current_group: ''
}, action) {
  switch (action.type) {
    case 'SET_CURRENT_MEMBERS': {
      return { ...state,
        current_members: action.members,
        status: action.status,
        current_group: action.groupName };
    }
    default:
      return state;
  }
}
