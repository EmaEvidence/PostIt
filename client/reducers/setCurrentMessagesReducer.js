/**
 * [reducer description]
 * @method reducer
 * @param  {Object} [state={                    current_messages: []] [description]
 * @param  {[type]} status        [description]
 * @param  {[type]} current_group [description]
 * @param  {[type]} action        [description]
 * @return {[type]}               [description]
 */
export default function reducer(state = {
  current_messages: [],
  status: '',
  current_group: ''
}, action) {
  switch (action.type) {
    case 'SET_CURRENT_MESSAGES': {
      return { ...state,
        current_messages: action.messages,
        status: action.status,
        current_group: action.groupName };
    }
    default:
      return state;
  }
}
