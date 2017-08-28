/**
 * [reducer description]
 * @method reducer
 * @param  {Object} [state={               groups: []}] [description]
 * @param  {[type]} action   [description]
 * @return {[type]}          [description]
 */
export default function reducer(state = {
  groups: []
}, action) {
  switch (action.type) {
    case 'ADD_USER_GROUPS': {
      return { ...state, groups: [...action.group] };
    }
    default:
      return state;
  }
}
