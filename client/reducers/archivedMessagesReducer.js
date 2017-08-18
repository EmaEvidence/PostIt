/**
 * [reducer description]
 * @method reducer
 * @param  {Object} [state={ myMessages: []}] [description]
 * @param  {[type]} action   [description]
 * @return {[type]}          [description]
 */
export default function reducer(state = {
  archivedMessages: []
}, action) {
  switch (action.type) {
    case 'GET_ARCHIVED_MESSAGES': {
      return Object.assign({}, state, {
        myMessages: [...action.messages]
      });
    }
    default:
      return state;
  }
}
