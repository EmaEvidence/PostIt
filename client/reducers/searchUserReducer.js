/**
 * reducer
 * @method reducer
 *
 * @param  {Object} state initial state
 * @param  {object} action
 *
 * @return {object} state new state
 */
const reducer = (state = {
  status: '',
  searchResult: [],
  pageCount: 0
}, action) => {
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
      return { ...state, status: '', pageCount: 0, searchResult: [] };
    }
    default:
      return state;
  }
};

export default reducer;
