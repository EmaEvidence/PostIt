/**
 * [reducer description]
 * @method reducer
 * @param  {Object} [state={status: ''}] [description]
 * @param  {[type]} action   [description]
 * @return {[type]}          [description]
 */
export default function reducer(state = {
  status: '',
  searchResult: []
}, action) {
  switch (action.type) {
    case 'SEARCH_USER': {
      return Object.assign({}, state, {
        status: action.message,
        searchResult: action.users
      });
    }
    case 'SEARCH_USER_ERROR': {
      return Object.assign({}, state, {
        status: action.message
      });
    }
    default:
      return state;
  }
}
