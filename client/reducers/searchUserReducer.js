/**
 * [reducer description]
 * @method reducer
 * @param  {Object} [state={status: ''}] [description]
 * @param  {[type]} action   [description]
 * @return {[type]}          [description]
 */
export default function reducer(state = {
  status: '',
  searchResult: [],
  pageCount: 0
}, action) {
  switch (action.type) {
    case 'SEARCH_USER': {
      return { ...state,
        status: action.message,
        searchResult: action.users,
        pageCount: Math.ceil(action.count / 5) };
    }
    case 'SEARCH_USER_ERROR': {
      return { ...state, status: action.message };
    }
    case 'CLEAR_SEARCH_USER_STATUS': {
      return { ...state, status: '', pageCount: 0 };
    }
    default:
      return state;
  }
}
